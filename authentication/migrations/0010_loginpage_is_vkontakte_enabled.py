# Generated by Django 3.2 on 2023-01-15 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_remove_loginpage_is_email_code_enabled'),
    ]

    operations = [
        migrations.AddField(
            model_name='loginpage',
            name='is_vkontakte_enabled',
            field=models.BooleanField(default=True, verbose_name='Enable VKontakte Login'),
        ),
    ]