# Generated by Django 3.2 on 2022-11-24 10:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="DateEventPost",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "updatedAt",
                    models.DateTimeField(auto_now=True, verbose_name="Updated At"),
                ),
                (
                    "createdAt",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "author",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="dateEventPosts",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Author",
                    ),
                ),
            ],
            options={
                "verbose_name": "Date Event Post",
                "verbose_name_plural": "Date Event Posts",
            },
        ),
        migrations.CreateModel(
            name="DateEvent",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "updatedAt",
                    models.DateTimeField(auto_now=True, verbose_name="Updated At"),
                ),
                (
                    "createdAt",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                ("date", models.DateTimeField(verbose_name="Date")),
                ("name", models.CharField(max_length=150, verbose_name="Name")),
                (
                    "description",
                    models.CharField(max_length=255, verbose_name="Description"),
                ),
                (
                    "picture",
                    models.ImageField(
                        upload_to="dateEventsPictures/", verbose_name="Picture"
                    ),
                ),
                (
                    "post",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="dateEvent",
                        to="dateEvents.dateeventpost",
                        verbose_name="Post",
                    ),
                ),
            ],
            options={
                "verbose_name": "Date Event",
                "verbose_name_plural": "Date Events",
            },
        ),
    ]
