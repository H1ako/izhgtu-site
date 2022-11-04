from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from authentication.models import CustomUser
from education.models import SpecializationGroup, Subject
from izhgtuSite.models import TimeStampedModel


class UserTag(TimeStampedModel):
    users = models.ManyToManyField(CustomUser, verbose_name=_('Users'), related_name='tags')
    name = models.CharField(_('Name'), max_length=60)
    description = models.CharField(_('Description'), max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = _('User Tag')
        verbose_name_plural = _('User Tags')


class Student(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='student', on_delete=models.CASCADE)
    group = models.ForeignKey(SpecializationGroup, related_name='students', null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = _('Student')
        verbose_name_plural = _('Students')


class StudentCard(TimeStampedModel):
    cardId = models.IntegerField(_('Student Card Id'), unique=True)
    issueDate = models.DateField(_('Issue Date'))
    creditedOrder = models.CharField(_('Credited Order'), max_length=150)
    validBy = models.DateField(_('Valid By'))
    student = models.OneToOneField(
        Student,
        verbose_name=_('Student'),
        related_name='studentCard',
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        verbose_name = _('Student Card')
        verbose_name_plural = _('Student Cards')


class Teacher(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='teacher', on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, related_name='teachers')
    groups = models.ManyToManyField(SpecializationGroup, related_name='teachers')

    class Meta:
        verbose_name = _('Teacher')
        verbose_name_plural = _('Teachers')


class Entrant(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='entrant', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Entrant')
        verbose_name_plural = _('Entrants')


class UserDocument(TimeStampedModel):
    user = models.ForeignKey(CustomUser, verbose_name=_('User'), related_name='documents', on_delete=models.CASCADE)
    name = models.CharField(_('Name'), max_length=100)
    file = models.FileField(_('File'), upload_to='userDocuments')
    fileType = models.CharField(_('File Type'), max_length=50)

    class Meta:
        verbose_name = _('User Document')
        verbose_name_plural = _('User Documents')
