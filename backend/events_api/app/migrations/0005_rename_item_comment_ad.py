# Generated by Django 4.0 on 2022-12-15 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_ad_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='item',
            new_name='ad',
        ),
    ]
