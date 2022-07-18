from django import urls
from django.urls import path
from .views import (
    api_categories,

)

urlpatterns = [
    path("categories", api_categories, name="api_categories"),
]

