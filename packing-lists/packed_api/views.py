from black import Mode
# from django.shortcuts import render
from common.json import ModelEncoder
from .models import PackingList, Category, Condition, Item, PackingListItem

# Create your views here.
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
