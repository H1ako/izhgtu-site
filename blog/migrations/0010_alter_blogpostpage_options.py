# Generated by Django 3.2 on 2023-01-01 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_auto_20221223_1808'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blogpostpage',
            options={'verbose_name': 'Blog Post', 'verbose_name_plural': 'Blog Posts'},
        ),
    ]
