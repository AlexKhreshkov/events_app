from django.contrib import admin
from .models import Category, UserProfile


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {"slug": ("name",)}


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'country', 'address', 'profile_pic')


admin.site.register(Category, CategoryAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
