# Generated by Django 3.2 on 2022-12-01 08:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('blog', '0001_initial'),
        ('wagtailimages', '0024_index_image_file_hash'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('title', models.CharField(max_length=100, verbose_name='Title')),
                ('picture', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Picture')),
                ('post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='news_list', to='blog.blogpostpage', verbose_name='Post Page')),
            ],
            options={
                'verbose_name': 'News',
                'verbose_name_plural': 'News List',
            },
        ),
    ]
