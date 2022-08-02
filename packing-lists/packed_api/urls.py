from django.urls import path
from .views import (
    api_categories,
    api_conditional_items,
    api_items,
    api_condition,
    api_conditions,
    api_category,
    api_item,
    api_packing_lists,
    api_packing_list_items,
    api_packing_list,
)

urlpatterns = [
    path("categories", api_categories, name="api_categories"),
    path("categories/<int:pk>/", api_category, name="api_category"),
    path("items", api_items, name="api_items"),
    path("items/<int:pk>/", api_item, name="api_item"),
    path("items/conditions/<str:condition>/", api_conditional_items, name="api_conditional_items"),    
    path("conditions", api_conditions, name="api_conditions"), 
    path("conditions/<int:pk>/", api_condition, name="api_condition"),
    path("packing_lists/", api_packing_lists, name="api_packing_lists"),
    path("packing_lists/<int:pk>/", api_packing_list, name="api_packing_list"),
    path("packing_lists/<int:pk>/items/", api_packing_list_items, name="api_packing_list_items"),
]
