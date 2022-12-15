from rest_framework import generics
from .models import Category, User, Ad
from app.serializers import CategorySerializer, UserSerializer, AdSerializer


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
