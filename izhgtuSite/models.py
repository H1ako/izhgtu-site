from django.utils.translation import gettext_lazy as _
from django.db import models


class TimeStampedModel(models.Model):
    updatedAt = models.DateTimeField(_('Updated At'), auto_now=True)
    createdAt = models.DateTimeField(_('Created At'), auto_now_add=True)

    class Meta:
        abstract = True
