from django.urls import path, include, re_path

from app.views import CategoryAPIList, UserAPIList, AdAPIList, AdRetrieveAPIView, UserRetrieveAPIView, CommentsAPIList, \
    CommentCreateAPI, CommentChangeAPIView

urlpatterns = [
    path('api/v1/categories/', CategoryAPIList.as_view()),
    path('api/v1/users/', UserAPIList.as_view()),
    path('api/v1/users/<int:pk>/', UserRetrieveAPIView.as_view()),
    path('api/v1/announcements/', AdAPIList.as_view()),
    path('api/v1/announcements/<slug:slug>/', AdRetrieveAPIView.as_view()),
    path('api/v1/comments/', CommentsAPIList.as_view()),
    path('api/v1/comments/create/', CommentCreateAPI.as_view()),
    path('api/v1/comments/<int:pk>/', CommentChangeAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
