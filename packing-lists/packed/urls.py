from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include('packed_api.urls')),
    path("api/", include('packed_api.urls')),
    path("auth/", include('packed_api.auth.urls')),
]
