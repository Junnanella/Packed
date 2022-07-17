from black import Mode
# from django.shortcuts import render
from common.json import ModelEncoder
from .models import PackingList, Category, Condition, Item, PackingListItem

# Create your views here.
class PackingListEncoder(ModelEncoder):
    model = PackingList
    properties = [
        "id",
        "name",
        "created",
        "travel_date",
        "completed",
        "location"
    ]

class CategoryEncoder(ModelEncoder):
    model = Category
    properties = [
        "category_name"
    ]

class ConditionEncoder(ModelEncoder):
    model = Condition
    properties = [
        "item_condition"
    ]

class ItemEncoder(ModelEncoder):
    model = Item
    properties = [
        "name",
        "category",
        "suggested",
        "condition",
        "user_item"
    ]

class PackingListItemEncoder(ModelEncoder):
    model = PackingListItem
    properties = [
        "item",
        "owner",
        "quantity",
        "packed",
        "packing_list",
    ]