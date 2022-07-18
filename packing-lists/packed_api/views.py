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
        "category_name" : CategoryEncoder()
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
            