# Generated by Django 3.2 on 2022-11-24 17:26

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_alter_homepage_face_body'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homepage',
            name='face_body',
        ),
        migrations.CreateModel(
            name='FaceHeading',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('text', models.CharField(max_length=255, verbose_name='Text')),
                ('short_text', models.CharField(max_length=150, verbose_name='Short text')),
                ('size', models.CharField(choices=[('small', 'Маленький'), ('normal', 'Обычный'), ('big', 'Большой')], default='normal', max_length=100, verbose_name='Size')),
                ('page', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='headings', to='home.homepage')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
    ]
