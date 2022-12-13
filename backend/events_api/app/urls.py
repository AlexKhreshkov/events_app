from django.urls import path, include, re_path

from app.views import CategoryAPIList, UserAPIList,AdAPIList

urlpatterns = [
    path('api/v1/categories/', CategoryAPIList.as_view()),
    path('api/v1/users/', UserAPIList.as_view()),
    path('api/v1/announcements/', AdAPIList.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
