# Generated by Django 3.2 on 2022-11-28 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_remove_blogpost_n'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='blogpost',
            old_name='updatedAt',
            new_name='updated_at',
        ),
    ]
