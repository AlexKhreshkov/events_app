from rest_framework import generics, mixins
from rest_framework.generics import GenericAPIView

from .models import Category, User, Ad, Comment
from app.serializers import CategorySerializer, UserSerializer, AdSerializer, CommentsSerializer, \
    CommentsChangeSerializer
from .permissions import IsOwner
from rest_framework.permissions import IsAuthenticated


class CategoryAPIList(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class UserAPIList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AdAPIList(generics.ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Ad.objects.all()
    lookup_field = 'slug'
    serializer_class = AdSerializer


class CommentsAPIList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsSerializer


class CommentCreateAPI(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsChangeSerializer
    permission_classes = (IsAuthenticated,)


class CommentChangeAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentsChangeSerializer
    permission_classes = (IsAuthenticated, IsOwner)
