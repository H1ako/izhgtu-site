# Generated by Django 3.2 on 2022-11-26 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="usertag",
            name="createdAt",
        ),
        migrations.RemoveField(
            model_name="usertag",
            name="updatedAt",
        ),
        migrations.AddField(
            model_name="quote",
            name="title",
            field=models.CharField(
                default="Об ИжГТУ", max_length=50, verbose_name="Title"
            ),
            preserve_default=False,
        ),
    ]
