# Generated by Django 3.2 on 2023-01-06 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('svg', '0002_auto_20221206_1738'),
        ('users', '0012_auto_20230106_1900'),
    ]

    operations = [
        migrations.AlterField(
            model_name='achievement',
            name='icon',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='svg.svgtyped'),
        ),
    ]
