from tkinter import Pack
from black import Mode
from django.http import JsonResponse
from django.core.exceptions import FieldDoesNotExist
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
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
    User,
)


def field_does_not_exist_error():
    return JsonResponse(
        {"message": "Invalid field name"},
        status=400,
    )


def model_instance_does_not_exist_message(model_name, pk):
    return JsonResponse(
        {"message": f"'{model_name}' with id number of '{pk}' does not exist"},
        status=400,
    )


def type_error_message(model_name):
    return JsonResponse(
        {"message": f"Failed to create '{model_name}' instance"},
        status=400,
    )


# Category Views -------
@require_http_methods(["GET", "POST"])
def api_categories(request):
    if request.method == "GET":
        categories = Category.objects.all().order_by("id")
        return JsonResponse(
            {"categories": categories},
            encoder=CategoryEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            category = Category.objects.create(**content)
            return JsonResponse(category, encoder=CategoryEncoder, safe=False)
        except TypeError:
            return type_error_message("Category")


@require_http_methods(["GET", "PUT", "DELETE"])
def api_category(request, pk):
    if request.method == "GET":
        try:
            category = Category.objects.get(id=pk)
            return JsonResponse(
                category,
                encoder=CategoryEncoder,
                safe=False,
            )
        except Category.DoesNotExist:
            return model_instance_does_not_exist_message("Category", pk)
    elif request.method == "PUT":
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
            return field_does_not_exist_error()
    else:
        try:
            count, _ = Category.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Category.DoesNotExist:
            return model_instance_does_not_exist_message("Category", pk)


# Item Views ------
@require_http_methods(["GET", "POST"])
def api_items(request):
    if request.method == "GET":
        items = Item.objects.all()
        return JsonResponse({"items": items}, encoder=ItemEncoder)
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
            return JsonResponse(item, encoder=ItemEncoder, safe=False)
        except TypeError:
            return type_error_message("Item")


@require_http_methods(["GET"])
def api_conditional_items(request, condition):
    if request.method == "GET":
        try:
            conditional_items = []
            if condition != "any":
                condition = Condition.objects.get(name=condition)
                conditional_items = Item.objects.filter(condition=condition)
            any_condition = Condition.objects.get(name="any")
            general_items = Item.objects.filter(condition=any_condition)
            return JsonResponse(
                {
                    "conditional_items": conditional_items,
                    "general_items": general_items,
                },
                encoder=ItemEncoder,
                safe=False,
            )
        except Condition.DoesNotExist:
            return JsonResponse(
                {
                    "message": f"'{condition}' may be an invalid condition. Also, make sure you have 'any' condition in database"
                },
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_item(request, pk):
    if request.method == "GET":
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
            return JsonResponse({"message": count > 0})
        except Item.DoesNotExist:
            return model_instance_does_not_exist_message("Item", pk)
    else:
        try:
            content = json.loads(request.body)
            Item.objects.filter(id=pk).update(**content)
            item = Item.objects.get(id=pk)
            return JsonResponse(item, encoder=ItemEncoder, safe=False)
        except Item.DoesNotExist:
            return model_instance_does_not_exist_message("Item", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_error()


# Condition Views -----
@require_http_methods(["GET", "POST"])
def api_conditions(request):
    if request.method == "GET":
        all_conditions = Condition.objects.all()
        return JsonResponse(
            {"all conditions": all_conditions},
            encoder=ConditionEncoder,
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
    if request.method == "GET":
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
            count, _ = Condition.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Condition.DoesNotExist:
            return model_instance_does_not_exist_message("Condition", pk)
    else:
        try:
            content = json.loads(request.body)
            Condition.objects.filter(id=pk).update(**content)
            condition = Condition.objects.get(id=pk)
            return JsonResponse(condition, encoder=ConditionEncoder, safe=False)
        except Condition.DoesNotExist:
            return model_instance_does_not_exist_message("Condition", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_error()


# PackingList Views -----
def create_packing_list(content):
    data = {
        "title": content["title"],
        "departure_date": content["departure_date"],
        "return_date": content["return_date"],
        "destination_city": content["destination_city"],
        "destination_country": content["destination_country"],
        "owner": content["owner"],
    }
    try:
        packing_list = PackingList.objects.create(**data)
        return packing_list
    except KeyError:
        return None


def add_packing_list_item(item, packing_list):
    existing_item = Item.objects.filter(name=item["name"])
    if item["suggested"] or len(existing_item) > 0:
        linked_item = Item.objects.get(name=item["name"])
        data = {
            "item_name": linked_item,
            "quantity": int(item["quantity"]),
            "packing_list": packing_list,
        }
    else:
        data = {
            "name": item["name"],
            "suggested": item["suggested"],
        }
        linked_item = Item.objects.create(**data)
        data = {
            "item_name": linked_item,
            "quantity": int(item["quantity"]),
            "packing_list": packing_list,
        }
    print(data)
    new_packing_list_item = PackingListItem.objects.create(**data)
    return new_packing_list_item


@api_view(["GET", "POST"])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def api_packing_lists(request):
    user = request.user
    if request.method == "GET":
        packing_lists = PackingList.objects.filter(owner=user)
        return JsonResponse(
            {"packing_lists": packing_lists},
            encoder=PackingListEncoder,
        )
    else:
        content = json.loads(request.body)
        content["owner"] = user
        packing_list = create_packing_list(content)
        if packing_list:
            return JsonResponse(
                packing_list,
                encoder=PackingListEncoder,
                safe=False,
            )
        else:
            return JsonResponse(
                {"message": "Failed to create packing list"},
                status=400,
            )

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def api_packing_list(request, pk):
    if request.method == "GET":
        packing_list = PackingList.objects.get(id=pk)
        return JsonResponse(
            packing_list,
            encoder=PackingListEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            packing_list = PackingList.objects.update(**content)
            return JsonResponse(
                packing_list,
                encoder=PackingListEncoder,
                safe=False,
            )
        except PackingList.DoesNotExist:
            return model_instance_does_not_exist_message("PackingList", pk)
        except FieldDoesNotExist:
            return field_does_not_exist_error()


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def api_packing_list_items(request, pk):
    if request.method == "GET":
        packing_list = PackingList.objects.get(id=pk)
        items = PackingListItem.objects.filter(packing_list=packing_list)
        print(items)
        return JsonResponse(
            {"items": items},
            encoder=PackingListItemEncoder,
        )
    else:
        content = json.loads(request.body)
        packing_list = PackingList.objects.get(id=pk)
        items = []
        try:
            for item in content["items"]:
                items.append(
                    add_packing_list_item(item=item, packing_list=packing_list)
                )
            return JsonResponse(
                {"items": items},
                encoder=PackingListItemEncoder,
                safe=False,
            )
        except TypeError:
            return type_error_message("Item")
