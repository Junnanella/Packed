from django import urls
from django.urls import path
from .views import (
    api_categories,
    api_conditional_items,
    api_items,
    api_condition,
    api_conditions
)

urlpatterns = [
    path("categories", api_categories, name="api_categories"),
    path("items", api_items, name="api_items"),
    path("items/<str:condition>", api_conditional_items, name="api_conditional_items"),    
    path("conditions/<int:pk>/", api_condition, name="api_condition"),
    path("conditions", api_conditions, name="api_conditions"), 
]
