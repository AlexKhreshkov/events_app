from django.contrib.auth.models import User
from rest_framework import serializers
from .models import  Category, UserProfile


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user_id', 'name', 'surname', 'phone', 'country', 'address', 'profile_pic')
