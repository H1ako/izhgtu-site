from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class DateeventsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "dateEvents"
    verbose_name = _("date events app")
