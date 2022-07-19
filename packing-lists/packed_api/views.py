from black import Mode
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from psycopg2 import IntegrityError
# from django.shortcuts import render
from common.json import ModelEncoder
from .models import PackingList, Category, Condition, Item, PackingListItem 
import json
# Create your views here.
# class User(ModelEncoder):
#     model = User
#     properties = [
#         "id",
#         "username",
#         "email",
#         "password"
#     ]

class PackingListEncoder(ModelEncoder):
    model = PackingList
    properties = [
        "id",
        "packing_list_name",
        "created",
        "travel_date",
        "completed",
        "location"
    ]

class CategoryEncoder(ModelEncoder):
    model = Category
    properties = [
        "id",
        "category_name"
    ]

class ConditionEncoder(ModelEncoder):
    model = Condition
    properties = [
        "id",
        "item_condition"
    ]

class ItemEncoder(ModelEncoder):
    model = Item
    properties = [
        "id",
        "item_name",
        "category",
        "suggested",
        "condition",
        "user_item"
    ]
    encoders = {
        "category" : CategoryEncoder(),
        "item_condition": ConditionEncoder(),
    }

class PackingListItemEncoder(ModelEncoder):
    model = PackingListItem
    properties = [
        "id",
        "item",
        "owner",
        "quantity",
        "packed",
        "packing_list",
    ]
    encoders = {
        "item_name" : ItemEncoder(),
        "packing_list_name" : PackingListEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_categories(request):
    if request.method == "GET":
        categories = Category.objects.all()
        return JsonResponse(
            {'categories' : categories},
            encoder= CategoryEncoder,
        )

    else: 
        try:
            content = json.loads(request.body)
            category= Category.objects.create(**content)
            return JsonResponse(
                category,
                encoder=CategoryEncoder,
                safe=False
            )
        except IntegrityError: 
            return JsonResponse(
            {'message' : "Unsuccessful POST"},
            status = 400)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_conditional_items(request, condition):
    if request.method =="GET":
        conditional_items = []
        if condition != "any":
            condition = Condition.objects.get(item_condition=condition)
            conditional_items = Item.objects.filter(condition=condition)
        any_condition = Condition.objects.get(item_condition="any")
        general_items = Item.objects.filter(condition=any_condition)
        return JsonResponse(
            {"items": [{"conditional_items": conditional_items}, {"general_items": general_items}]},
            encoder=ItemEncoder,
            safe=False,
        )
    # ****
    elif request.method == "DELETE":
        try:
            conditional_item = Condition.objects.get(item_condition=condition)
            conditional_item.delete()
            return JsonResponse(
                {"message": "Delete was successful"}
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {'message': "Does not exist"},
                status=400,
            )
    else: 
        try:
            content = json.loads(request.body)
            Condition.objects.filter(conditional_items).update(**content)
            conditional_item = Condition.objects.get(item_condition=conditional_item)
            return JsonResponse(
                conditional_item,
                encoder=ConditionEncoder,
                safe=False
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {'message': 'Does not exist'},
                status = 400,
            )
    # ****
            
@require_http_methods(["GET", "POST"])
def api_list_items(request):
    if request.method == "GET":
        items = Item.objects.all()
        return JsonResponse(
            {"items": items},
            encoder=ItemEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            if "condition" in content:
                condition = Condition.objects.get(item_condition=content["condition"])
                content["condition"] = condition
            if "category" in content:
                category = Category.objects.get(category_name=content["category"])
                content["category"] = category
            item = Item.objects.create(**content)
            return JsonResponse(
                item,
                encoder=ItemEncoder,
                safe=False
            )   
        except IntegrityError: 
            return JsonResponse(
            {'message' : "Unsuccessful POST"},
            status = 400)

@require_http_methods(["DELETE", "PUT"])
def api_condition(request, pk):
    if request.method == "DELETE":
        try:
            count,_ = Condition.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {'message': "Does not exist"},
                status=400,
            )
    # else: 
    #     try:
    #         content = json.loads(request.body)
    #         Condition.objects.filter(id=pk).update(**content)
    #         conditional_item = Condition.objects.get(item_condition=conditional_item)
    #         return JsonResponse(
    #             conditional_item,
    #             encoder=ConditionEncoder,
    #             safe=False
    #         )
    #     except Condition.DoesNotExist:
    #         return JsonResponse(
    #             {'message': 'Does not exist'},
    #             status = 400,
    #         )

@require_http_methods(["GET"])
def api_get_all_conditions(request):
    if request.method =="GET":
        all_conditions = Condition.objects.all()
        return JsonResponse(
            {"all conditions": all_conditions},
            encoder= ConditionEncoder,
        )
