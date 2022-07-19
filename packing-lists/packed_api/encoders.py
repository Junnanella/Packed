from common.json import ModelEncoder
from .models import (
    PackingList,
    Category,
    Condition,
    Item,
    PackingListItem,
)

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
        "category_name",
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
        "user_item",
        "condition",
        "suggested",
    ]
    encoders = {
        "category" : CategoryEncoder(),
        "condition": ConditionEncoder(),
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
