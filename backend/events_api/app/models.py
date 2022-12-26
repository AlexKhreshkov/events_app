from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify


class User(AbstractUser):
    email = models.EmailField(unique=True)
    image = models.ImageField(null=True, blank=True, upload_to="profiles_images/",
                              default="profiles_images/ava.png")
    phone = models.CharField(max_length=15, blank=True, null=True, default='',)


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return f"{self.name}"


class Ad(models.Model):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    image = models.ImageField(null=True, blank=True, upload_to="announcements_images/",
                              default="announcements_images/noImage.jpeg")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Ad, self).save(*args, **kwargs)

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
