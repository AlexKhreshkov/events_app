from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email address'), blank=True, unique=True)
    image = models.ImageField(null=True, blank=True, upload_to="profiles_images/",
                                    default="profiles_images/ava.png")
    name = models.CharField(max_length=30, blank=True, default='')
    surname = models.CharField(max_length=30, blank=True, default='')
    phone = models.CharField(max_length=15, blank=True, default='')

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def __str__(self):
        return f"{self.name}"


class Ad(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField(max_length=2000)
    image = models.ImageField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment on: {self.title}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Ad, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    text = models.TextField(max_length=3000)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment on: {self.item}"

#
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=30, blank=True, default='')
#     surname = models.CharField(max_length=30, blank=True, default='')
#     phone = models.CharField(max_length=15, blank=True, default='')
#     country = models.CharField(max_length=70, blank=True, default='')
#     address = models.CharField(max_length=100, blank=True, default='')
#     profile_pic = models.ImageField(null=True, blank=True, upload_to="profiles_images/",
#                                     default="profiles_images/ava.png")
#
#     def __str__(self):
#         return f"User {self.user.username}"


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         User.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
