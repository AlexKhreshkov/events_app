# Generated by Django 4.0 on 2022-12-24 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_ad_slug_alter_ad_title_alter_category_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=15, null=True, unique=True),
        ),
    ]