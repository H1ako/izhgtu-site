from django.db import models
from django.utils.translation import gettext_lazy as _

from authentication.models import CustomUser
from izhgtuSite.models import TimeStampedModel


class Subject(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)

    class Meta:
        verbose_name = _('Subject')
        verbose_name_plural = _('Subjects')

    def __str__(self):
        return f"{self.name}"


class EducationType(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)

    class Meta:
        verbose_name = _('Education Type')
        verbose_name_plural = _('Education Types')

    def __str__(self):
        return f"{self.name}"


class Faculty(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)
    educationType = models.ForeignKey(
        EducationType,
        verbose_name=_('Education Type'),
        related_name='faculties',
        null=True,
        on_delete=models.SET_NULL
    )

    class Meta:
        verbose_name = _('Faculty')
        verbose_name_plural = _('Faculties')

    def __str__(self):
        return f"{self.educationType.name} - {self.name}"


class Specialization(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=200, unique=True)
    faculty = models.ForeignKey(
        Faculty,
        verbose_name=_('Specialization'),
        related_name='specializations',
        null=True,
        on_delete=models.SET_NULL
    )

    class Meta:
        verbose_name = _('Specialization')
        verbose_name_plural = _('Specializations')

    def __str__(self):
        return f"{self.faculty} - {self.name}"


class SpecializationGroup(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=100, unique=True)
    year = models.SmallIntegerField(_('Education Year'))
    specialization = models.ForeignKey(
        Specialization,
        verbose_name=_('Specialization'),
        related_name='groups',
        null=True,
        on_delete=models.SET_NULL
    )
    leader = models.ForeignKey(
        CustomUser,
        related_name='leaderOfGroups',
        verbose_name=_('Group Leader'),
        on_delete=models.SET_NULL,
        null=True
    )
    subjects = models.ManyToManyField(Subject, verbose_name=_('Subjects'), related_name='groups')

    class Meta:
        verbose_name = _('Specialization Group')
        verbose_name_plural = _('Specialization Groups')

    def __str__(self):
        return f"{self.name} - {self.specialization.name}"
