from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AdmissionapplicationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "admissionApplications"
    verbose_name = _("admission applications app")
