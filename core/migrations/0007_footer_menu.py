# Generated by Django 3.2 on 2022-12-01 20:05

from django.db import migrations
import wagtail.blocks
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_rename_maincomponentssettings_maincontentsettings'),
    ]

    operations = [
        migrations.AddField(
            model_name='footer',
            name='menu',
            field=wagtail.fields.StreamField([('Page', wagtail.blocks.PageChooserBlock(required=True))], blank=True, null=True, use_json_field=True),
        ),
    ]
