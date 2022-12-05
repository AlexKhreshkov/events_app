from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from app.views import CategoryAPIList, UsersProfilesAPIList

urlpatterns = [
    path('api/v1/categories/', CategoryAPIList.as_view()),
    path('api/v1/profiles/', UsersProfilesAPIList.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
