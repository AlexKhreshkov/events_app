from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Category, Ad, Comment
from django.contrib.auth import get_user_model

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'phone', 'email', 'image')


class AdSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name')
    category_slug = serializers.CharField(source='category.slug')
    category_id = serializers.CharField(source='category.id')

    class Meta:
        model = Ad
        fields = ('id', 'title', 'slug', 'user_id',
                  'category_id', 'category_name',
                  'category_slug', 'text',
                  'image', 'created', 'updated')

class AdPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ('id', 'title',
                  'category','text',
                  'image', 'user')

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'ad', 'name', 'text', 'created', 'updated')


class CommentsChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user', 'ad', 'name', 'text', 'created', 'updated')
