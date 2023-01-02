from rest_framework import generics, mixins, filters
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Category, User, Ad, Comment
from app.serializers import CategorySerializer, UserSerializer, AdSerializer, CommentsSerializer, \
    CommentsChangeSerializer, AdPostSerializer
from .permissions import IsOwner, IsOwnerUserProfile, IsOwnerOrReadOnly
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


class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsOwnerUserProfile)


class AdAPIList(generics.ListAPIView):
    queryset = Ad.objects.all().order_by('-id')
    serializer_class = AdSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'text']


class AdCreateAPIView(generics.CreateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdPostSerializer
    permission_classes = (IsAuthenticated,)


class AdRetrieveUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ad.objects.all()
    lookup_field = 'slug'
    serializer_class = AdSerializer
    permission_classes = (IsOwnerOrReadOnly,)


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
