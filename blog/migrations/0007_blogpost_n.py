# Generated by Django 3.2 on 2022-11-28 16:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_alter_news_options'),
        ('blog', '0006_remove_blogpost_n'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='n',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='news', to='news.news', verbose_name='News'),
        ),
    ]