# Generated by Django 3.2 on 2023-01-23 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0013_auto_20230118_2302'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='signed_up',
            field=models.BooleanField(default=False, verbose_name='Signed Up'),
        ),
    ]