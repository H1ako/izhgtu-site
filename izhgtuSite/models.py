from django.utils.translation import gettext_lazy as _
from django.db import models


class TimeStampedModel(models.Model):
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)

    class Meta:
        abstract = True
