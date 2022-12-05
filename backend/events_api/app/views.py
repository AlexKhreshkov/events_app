from rest_framework import generics
from .models import Category, UserProfile
from app.serializers import CategorySerializer, ProfilesSerializer


class CategoryAPIList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UsersProfilesAPIList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = ProfilesSerializer
