from black import Mode
from django.http import JsonResponse
from django.core.exceptions import FieldDoesNotExist
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

def field_does_not_exist_error():
    return JsonResponse(
        {"message": "Invalid field name"},
        status = 400,
    )

def model_instance_does_not_exist_message(model_name, pk):
    return JsonResponse(
        {"message": f"'{model_name}' with id number of '{pk}' does not exist"},
        status = 400,
    )

def type_error_message(model_name):
    return JsonResponse(
        {'message' : f"Failed to create '{model_name}' instance"},
        status = 400,
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
            return type_error_message("Category")

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
            return model_instance_does_not_exist_message("Category", pk)
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
            return model_instance_does_not_exist_message("Category", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_errr()
    else:
        try:
            count, _ = Category.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Category.DoesNotExist:
            return model_instance_does_not_exist_message("Category", pk)

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
                condition = Condition.objects.get(name=content["condition"])
                content["condition"] = condition
            if "category" in content:
                category = Category.objects.get(name=content["category"])
                content["category"] = category
            item = Item.objects.create(**content)
            return JsonResponse(
                item,
                encoder=ItemEncoder,
                safe=False
            )
        except TypeError: 
            return type_error_message("Item")


@require_http_methods(["GET"])
def api_conditional_items(request, condition):
    if request.method =="GET":
        try:
            conditional_items = []
            if condition != "any":
                condition = Condition.objects.get(name=condition)
                conditional_items = Item.objects.filter(condition=condition)
            any_condition = Condition.objects.get(name="any")
            general_items = Item.objects.filter(condition=any_condition)
            return JsonResponse(
                {"items": [{"conditional_items": conditional_items}, {"general_items": general_items}]},
                encoder=ItemEncoder,
                safe=False,
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {"message":
                    f"'{condition}' may be an invalid condition. Also, make sure you have 'any' condition in database"
                })

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
            return model_instance_does_not_exist_message("Item", pk)
    elif request.method == "DELETE":
        try:
            count, _ = Item.objects.get(id=pk).delete()
            return JsonResponse(
                {"message": count > 0}
            )
        except Item.DoesNotExist:
            return model_instance_does_not_exist_message("Item", pk)
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
            return model_instance_does_not_exist_message("Item", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_errr()

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
        except TypeError: 
            return type_error_message("Condition")

@require_http_methods(["GET", "DELETE", "PUT"])
def api_condition(request, pk):
    if request.method =="GET":
        try:
            condition = Condition.objects.get(id=pk)
            return JsonResponse(
                condition,
                encoder=ConditionEncoder,
                safe=False,
            )
        except Condition.DoesNotExist:
            return model_instance_does_not_exist_message("Condition", pk)
    elif request.method == "DELETE":
        try:
            count,_ = Condition.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Condition.DoesNotExist:
            return model_instance_does_not_exist_message("Condition", pk)
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
            return model_instance_does_not_exist_message("Condition", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_errr()

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
