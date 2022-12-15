from django.urls import path, include, re_path

from app.views import CategoryAPIList, UserAPIList,AdAPIList, AdRetrieveAPIView, UserRetrieveAPIView

urlpatterns = [
    path('api/v1/categories/', CategoryAPIList.as_view()),
    path('api/v1/users/', UserAPIList.as_view()),
    path('api/v1/users/<int:pk>/', UserRetrieveAPIView.as_view()),
    path('api/v1/announcements/', AdAPIList.as_view()),
    path('api/v1/announcements/<slug:slug>/', AdRetrieveAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
