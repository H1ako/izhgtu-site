# Generated by Django 3.2 on 2022-11-27 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0003_auto_20221127_2028"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="blogpost",
            options={"verbose_name": "Blog Post", "verbose_name_plural": "Blog Posts"},
        ),
        migrations.AlterModelOptions(
            name="blogpostcategory",
            options={
                "verbose_name": "Blog Post Category",
                "verbose_name_plural": "Blog Post Categories",
            },
        ),
    ]
