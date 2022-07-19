from django import urls
from django.urls import path
from .views import (
    api_categories,
    api_conditional_items,
    api_list_items,
    api_condition,
    api_get_all_conditions
)

urlpatterns = [
    path("categories", api_categories, name="api_categories"),
    path("items", api_list_items, name="api_list_items"),
    path("items/<str:condition>", api_conditional_items, name="api_conditional_items"),    
    path("conditions/<int:pk>/", api_condition, name="api_condition"),
    path("conditions", api_get_all_conditions, name="api_get_all_conditions"), 

]

