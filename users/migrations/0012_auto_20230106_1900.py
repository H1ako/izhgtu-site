# Generated by Django 3.2 on 2023-01-06 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_alter_achievement_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercontact',
            name='title',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='usercontact',
            name='value',
            field=models.CharField(max_length=500),
        ),
    ]
