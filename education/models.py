from django.db import models
from django.utils.translation import gettext_lazy as _

from izhgtuSite.models import TimeStampedModel


class Subject(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)


class EducationType(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)


class Faculty(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)
    educationType = models.ForeignKey(
        EducationType,
        verbose_name=_('Education Type'),
        related_name='faculties',
        null=True,
        on_delete=models.SET_NULL
    )


class Specialization(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)
    faculty = models.ForeignKey(
        Faculty,
        verbose_name=_('Specialization'),
        related_name='specializations',
        null=True,
        on_delete=models.SET_NULL
    )


class SpecializationGroup(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=100, unique=True)
    specialization = models.ForeignKey(
        Specialization,
        verbose_name=_('Specialization'),
        related_name='groups',
        null=True,
        on_delete=models.SET_NULL
    )
    subjects = models.ManyToManyField(Subject, verbose_name=_('Subjects'), related_name='groups')