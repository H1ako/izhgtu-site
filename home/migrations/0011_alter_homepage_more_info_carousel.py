# Generated by Django 3.2 on 2022-11-26 14:12

from django.db import migrations
import wagtail.blocks
import wagtail.fields
import wagtail.images.blocks
import wagtailmedia.blocks


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0010_alter_homepage_more_info_carousel"),
    ]

    operations = [
        migrations.AlterField(
            model_name="homepage",
            name="more_info_carousel",
            field=wagtail.fields.StreamField(
                [
                    (
                        "video",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "content",
                                    wagtailmedia.blocks.VideoChooserBlock(
                                        help_text="Video"
                                    ),
                                )
                            ]
                        ),
                    ),
                    (
                        "picture",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "content",
                                    wagtail.images.blocks.ImageChooserBlock(
                                        help_text="Image"
                                    ),
                                ),
                                (
                                    "link",
                                    wagtail.blocks.CharBlock(
                                        help_text="Link", max_length=500, required=False
                                    ),
                                ),
                            ]
                        ),
                    ),
                ],
                blank=True,
                null=True,
                use_json_field=True,
            ),
        ),
    ]
