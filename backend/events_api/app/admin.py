from django.contrib import admin
from .models import Category, Comment, Ad, User


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {"slug": ("name",)}


class AdAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'slug', 'category', 'text', 'image', 'created', 'updated')
    prepopulated_fields = {"slug": ("title",)}


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item', 'name', 'text', 'created', 'updated')


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'country', 'address', 'profile_pic')


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_active')


admin.site.register(Category, CategoryAdmin)
admin.site.register(Ad, AdAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(User, UserAdmin)
