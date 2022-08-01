from django.urls import path
from .views import(
    get_routes,
    MyTokenObtainPairView,
    UserCreate,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", get_routes, name="get_routes"),
    path("signup/", UserCreate.as_view(), name="user_create"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 