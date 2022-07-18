from django import urls
from django.urls import path
from .views import (
    api_categories,
    api_conditional_items,
    api_list_items,
)

urlpatterns = [
    path("categories", api_categories, name="api_categories"),
    path("items", api_list_items, name="api_list_items"),
    path("items/<str:condition>", api_conditional_items, name="api_conditional_items"),
]

