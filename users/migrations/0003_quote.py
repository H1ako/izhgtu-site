# Generated by Django 3.2 on 2022-11-15 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20221104_2229'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=250, verbose_name='Автор')),
                ('authorPicture', models.ImageField(upload_to='quotesAuthors/', verbose_name='Изображение Автора')),
                ('authorOccupation', models.CharField(max_length=150, verbose_name='Профессия Автора')),
                ('text', models.TextField(verbose_name='Текст')),
            ],
            options={
                'verbose_name': 'Quote',
                'verbose_name_plural': 'Quotes',
            },
        ),
    ]
