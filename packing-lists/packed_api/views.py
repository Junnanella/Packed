from black import Mode
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .encoders import (
    PackingListItemEncoder,
    PackingListEncoder,
    CategoryEncoder,
    ConditionEncoder,
    ItemEncoder,
)
from .models import (
    PackingListItem,
    PackingList,
    Category,
    Condition,
    Item,
)

# Category Views -------
@require_http_methods(["GET", "POST"])
def api_categories(request):
    if request.method == "GET":
        categories = Category.objects.all().order_by("id")
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
        except TypeError: 
            return JsonResponse(
                {'message' : "Failed to create category"},
                status = 400,
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_category(request, pk):
    if request.method =="GET":
        try:
            category = Category.objects.get(id=pk)
            return JsonResponse(
                category,
                encoder=CategoryEncoder,
                safe=False,
            )
        except Category.DoesNotExist:
            return JsonResponse(
                {"message": f"Category with id number of {pk} does not exist"}
            )
    elif request.method =="PUT":
        try:
            content = json.loads(request.body)
            category = Category.objects.filter(id=pk)
            category.update(**content)
            return JsonResponse(
                category,
                encoder=CategoryEncoder,
                safe=False,
            )
        except Category.DoesNotExist:
            return JsonResponse(
                {"message": "Category does not exist"},
                status = 400,
            )
    else:
        try:
            count, _ = Category.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Category.DoesNotExist:
            return JsonResponse(
                {'message': "The message you are trying to delete does not exist"},
                status=400,
            )

# Item Views ------
@require_http_methods(["GET", "POST"])
def api_items(request):
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
        except TypeError: 
            return JsonResponse(
            {'message' : "Failed to create item"},
            status = 400)

@require_http_methods(["GET"])
def api_conditional_items(request, condition):
    if request.method =="GET":
        try:
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
        except Condition.DoesNotExist:
            return JsonResponse(
                {"message": f"'{condition}' may be an invalid condition. Also, make sure you have 'any' condition in database"}
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_item(request, pk):
    if request.method =="GET":
        try:
            item = Item.objects.get(id=pk)
            return JsonResponse(
                item,
                encoder=ItemEncoder,
                safe=False,
            )
        except Item.DoesNotExist:
            return JsonResponse(
                {"message": f"Item with id number of {pk} does not exist"}
            )
    elif request.method == "DELETE":
        try:
            item = Item.objects.get(id=pk)
            item.delete()
            return JsonResponse(
                {"message": "Delete was successful"}
            )
        except:
            return JsonResponse(
                {'message': "Item does not exist"},
                status=400,
            )
    else:
        try:
            content = json.loads(request.body)
            Item.objects.filter(id=pk).update(**content)
            item = Item.objects.get(id=pk)
            return JsonResponse(
                item,
                encoder=ItemEncoder,
                safe=False
            )
        except Item.DoesNotExist:
            return JsonResponse(
                {'message': 'Does not exist'},
                status = 400,
            )

# Condition Views -----
@require_http_methods(["GET", 'POST'])
def api_conditions(request):
    if request.method =="GET":
        all_conditions = Condition.objects.all()
        return JsonResponse(
            {"all conditions": all_conditions},
            encoder= ConditionEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            condition = Condition.objects.create(**content)
            return JsonResponse(
                condition,
                encoder=ConditionEncoder,
                safe=False,
            )
        except: 
            return JsonResponse(
                {"message": "Could not create condition"},
                status=400,
            )

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
    else:
        try:
            content = json.loads(request.body)
            Condition.objects.filter(id=pk).update(**content)
            condition = Condition.objects.get(id=pk)
            return JsonResponse(
                condition,
                encoder=ConditionEncoder,
                safe=False
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {'message': 'Does not exist'},
                status = 400,
            )

# PackingList Views -----

# @require_http_methods(["GET", "POST"])
# def api_packing_lists(request, user_id):
#     if request.method == "GET":
#         owner = User.objects.get(id=user_id)
#         packing_lists = PackingList.objects.filter(owner=owner)
#         return JsonResponse(
#             {"lists": packing_lists},
#             encoder=PackingListEncoder,
#             safe=False,
#         )
#     else:
#         pass

# END Packing Lists ----
