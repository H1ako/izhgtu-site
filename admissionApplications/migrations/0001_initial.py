# Generated by Django 3.2 on 2022-11-24 10:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("education", "0001_initial"),
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AdmissionApplication",
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
                    "updatedAt",
                    models.DateTimeField(auto_now=True, verbose_name="Updated At"),
                ),
                (
                    "createdAt",
                    models.DateTimeField(auto_now_add=True, verbose_name="Created At"),
                ),
                (
                    "entrant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="applications",
                        to="users.entrant",
                        verbose_name="Entrant",
                    ),
                ),
                (
                    "specialization",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="applications",
                        to="education.specialization",
                        verbose_name="Specialization",
                    ),
                ),
            ],
            options={
                "verbose_name": "Admission Application",
                "verbose_name_plural": "Admission Applications",
            },
        ),
    ]
