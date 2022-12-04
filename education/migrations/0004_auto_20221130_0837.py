# Generated by Django 3.2 on 2022-11-30 04:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("education", "0003_auto_20221130_0816"),
    ]

    operations = [
        migrations.CreateModel(
            name="EducationForm",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Updated At"),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "name",
                    models.CharField(max_length=200, unique=True, verbose_name="Name"),
                ),
            ],
            options={
                "verbose_name": "Education Form",
                "verbose_name_plural": "Education Forms",
            },
        ),
        migrations.AddField(
            model_name="specializationgroup",
            name="education_form",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="groups",
                to="education.educationform",
                verbose_name="Education Form",
            ),
        ),
    ]