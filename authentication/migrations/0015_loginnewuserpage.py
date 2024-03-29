# Generated by Django 3.2 on 2023-01-24 06:50

from django.db import migrations, models
import django.db.models.deletion
import wagtail_headless_preview.models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0078_referenceindex'),
        ('authentication', '0014_user_signed_up'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoginNewUserPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
            ],
            options={
                'abstract': False,
            },
            bases=(wagtail_headless_preview.models.HeadlessMixin, 'wagtailcore.page'),
        ),
    ]
