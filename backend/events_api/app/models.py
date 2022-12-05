from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def __str__(self):
        return f"{self.name}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, default='')
    surname = models.CharField(max_length=30, blank=True, default='')
    phone = models.CharField(max_length=15, blank=True, default='')
    country = models.CharField(max_length=70, blank=True, default='')
    address = models.CharField(max_length=100, blank=True, default='')
    profile_pic = models.ImageField(null=True, blank=True, upload_to="profiles_images/",
                                    default="profiles_images/ava.png")

    def __str__(self):
        return f"User {self.user.username}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
