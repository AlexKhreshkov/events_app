from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    image = models.ImageField(null=True, blank=True, upload_to="profiles_images/",
                              default="profiles_images/ava.png")
    phone = models.CharField(max_length=15, blank=True, default='')


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def __str__(self):
        return f"{self.name}"


class Ad(models.Model):
    title = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    image = models.ImageField(null=True, blank=True, upload_to="announcements_images/",
                              default="announcements_images/noImage.jpeg")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment on: {self.title}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    text = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment on: {self.ad}"

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
