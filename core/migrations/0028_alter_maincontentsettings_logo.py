# Generated by Django 3.2 on 2022-12-06 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('svg', '0001_initial'),
        ('core', '0027_alter_maincontentsettings_yandex_map_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maincontentsettings',
            name='logo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='svg.svgtyped', verbose_name='Logo'),
        ),
    ]
