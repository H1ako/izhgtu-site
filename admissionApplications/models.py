from django.db import models
from django.utils.translation import gettext_lazy as _

from izhgtuSite.models import TimeStampedModel
from education.models import Specialization
from users.models import Entrant


class AdmissionApplication(TimeStampedModel):
    entrant = models.ForeignKey(
        Entrant,
        verbose_name=_('Entrant'),
        related_name='applications',
        on_delete=models.CASCADE
    )
    specialization = models.ForeignKey(
        Specialization,
        verbose_name=_('Specialization'),
        related_name='applications',
        null=True,
        on_delete=models.SET_NULL
    )