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
        "name",
        "created",
        "travel_date",
        "completed",
        "location",
    ]

class CategoryEncoder(ModelEncoder):
    model = Category
    properties = [
        "id",
        "name",
    ]

class ConditionEncoder(ModelEncoder):
    model = Condition
    properties = [
        "id",
        "name",
    ]

class ItemEncoder(ModelEncoder):
    model = Item
    properties = [
        "id",
        "name",
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
        "item_name",
        "owner",
        "quantity",
        "packed",
        "packing_list",
    ]
    encoders = {
        "item_name" : ItemEncoder(),
        "packing_list" : PackingListEncoder()
    }
