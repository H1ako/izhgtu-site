# Generated by Django 3.2 on 2022-12-06 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailsvg', '0005_alter_svg_file'),
        ('svg', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TypedSvg',
        ),
        migrations.CreateModel(
            name='SvgTyped',
            fields=[
            ],
            options={
                'verbose_name': 'Svg',
                'verbose_name_plural': 'Svg List',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('wagtailsvg.svg',),
        ),
    ]
