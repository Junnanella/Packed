from common.json import ModelEncoder
from .models import (
    PackingList,
    Category,
    Condition,
    Item,
    PackingListItem,
)

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
        "condition",
        "suggested",
    ]
    encoders = {
        "category" : CategoryEncoder(),
        "condition": ConditionEncoder(),
    }

class SimpleItemEncoder(ModelEncoder):
    model = Item
    properties = [
        "id",
        "name",
        "suggested",
    ]

class PackingListItemEncoder(ModelEncoder):
    model = PackingListItem
    properties = [
        "id",
        "item_name",
        "quantity",
        "packed",
    ]
    encoders = {
        "item_name" : SimpleItemEncoder(),
    }

class PackingListEncoder(ModelEncoder):
    model = PackingList
    properties = [
        "id",
        "title",
        "created",
        "departure_date",
        "return_date",
        "completed",
        "destination_city",
        "destination_country",
    ]



# class PackingListItemEncoder(ModelEncoder):
#     model = PackingListItem
#     properties = [
#         "id",
#         "item_name",
#         "owner",
#         "quantity",
#         "packed",
#         "packing_list",
#     ]
#     encoders = {
#         "item_name" : ItemEncoder(),
#         "packing_list" : PackingListEncoder()
#     }


