from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from instance_selector.edit_handlers import InstanceSelectorPanel
from wagtail.admin.panels import FieldPanel
from wagtail.images.models import Image

from authentication.models import User
from education.models import SpecializationGroup, Subject
from izhgtuSite.models import TimeStampedModel


class Student(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='student', on_delete=models.CASCADE)
    group = models.ForeignKey(SpecializationGroup, related_name='students', null=True, on_delete=models.SET_NULL)

    panels = [
        InstanceSelectorPanel('user'),
        InstanceSelectorPanel('group'),
    ]

    class Meta:
        verbose_name = _('Student')
        verbose_name_plural = _('Students')

    def __str__(self):
        return f"{self.user}"


class StudentCard(TimeStampedModel):
    card_id = models.CharField(_('Student Card Id'), unique=True, max_length=100)
    issue_date = models.DateField(_('Issue Date'))
    credited_order = models.CharField(_('Credited Order'), max_length=150)
    valid_by = models.DateField(_('Valid By'))
    student = models.OneToOneField(
        Student,
        verbose_name=_('Student'),
        related_name='student_card',
        on_delete=models.SET_NULL,
        null=True
    )

    panels = [
        FieldPanel('card_id'),
        FieldPanel('issue_date'),
        FieldPanel('credited_order'),
        FieldPanel('valid_by'),
        InstanceSelectorPanel('student'),
    ]

    class Meta:
        verbose_name = _('Student Card')
        verbose_name_plural = _('Student Cards')

    def __str__(self):
        return f"{self.card_id}"


class Teacher(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='teacher', on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, related_name='teachers')
    groups = models.ManyToManyField(SpecializationGroup, related_name='teachers')

    panels = [
        InstanceSelectorPanel('user'),
        FieldPanel('subjects'),
        FieldPanel('groups'),
        # InstanceSelectorPanel('student'),
    ]

    class Meta:
        verbose_name = _('Teacher')
        verbose_name_plural = _('Teachers')

    def __str__(self):
        return f"{self.user}"


class Entrant(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='entrant', on_delete=models.CASCADE)

    panels = [
        InstanceSelectorPanel('user'),
    ]

    class Meta:
        verbose_name = _('Entrant')
        verbose_name_plural = _('Entrants')

    def __str__(self):
        return f"{self.user}"


class UserDocument(TimeStampedModel):
    user = models.ForeignKey(User, verbose_name=_('User'), related_name='documents', on_delete=models.CASCADE)
    name = models.CharField(_('Name'), max_length=100)
    file = models.FileField(_('File'), upload_to='user_documents')

    panels = [
        InstanceSelectorPanel('user'),
        FieldPanel('name'),
        FieldPanel('file'),
    ]

    class Meta:
        verbose_name = _('User Document')
        verbose_name_plural = _('User Documents')

    def __str__(self):
        return f"{self.user} - {self.name}"
