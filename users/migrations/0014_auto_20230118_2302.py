# Generated by Django 3.2 on 2023-01-18 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_alter_achievement_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='bg_picture',
            field=models.ImageField(blank=True, null=True, upload_to='userBgPictures/', verbose_name='Profile Background Picture'),
        ),
        migrations.AddField(
            model_name='profile',
            name='first_name',
            field=models.CharField(default='Никита', max_length=40, verbose_name='Name'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='last_name',
            field=models.CharField(default='Соболев', max_length=80, verbose_name='Surname'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='patronymic',
            field=models.CharField(default='Алексеевич', max_length=80, verbose_name='Patronymic'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='userPictures/', verbose_name='Profile Picture'),
        ),
        migrations.AddField(
            model_name='profile',
            name='tags',
            field=models.ManyToManyField(related_name='usersProfiles', to='users.UserTag', verbose_name='Tags'),
        ),
    ]
