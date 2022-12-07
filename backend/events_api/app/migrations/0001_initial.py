# Generated by Django 4.0 on 2022-12-07 07:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('slug', models.SlugField()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=30)),
                ('surname', models.CharField(blank=True, default='', max_length=30)),
                ('phone', models.CharField(blank=True, default='', max_length=15)),
                ('country', models.CharField(blank=True, default='', max_length=70)),
                ('address', models.CharField(blank=True, default='', max_length=100)),
                ('profile_pic', models.ImageField(blank=True, default='profiles_images/ava.png', null=True, upload_to='profiles_images/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
        ),
    ]
