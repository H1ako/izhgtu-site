from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from grapple.models import GraphQLImage, GraphQLString, GraphQLRichText
from authentication.models import User
from education.models import SpecializationGroup, Subject
from izhgtuSite.models import TimeStampedModel
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.snippets.models import register_snippet


@register_snippet
class Quote(models.Model):
    author = models.CharField(_('Author'), max_length=250)
    author_picture = models.ForeignKey(
        'wagtailimages.Image',
        blank=True,
        null=True,
        verbose_name=_('Author Picture'),
        related_name='+',
        on_delete=models.SET_NULL
    )
    author_occupation = models.CharField(_('Author Occupation'), max_length=150, blank=True, null=True)
    text = RichTextField(help_text=_('Text'), verbose_name=_('Text'),
                         features=['h1', 'h2', 'h3', 'h4', 'h5', 'bold', 'link', 'hr'])

    panels = [
        FieldPanel('author'),
        FieldPanel('author_picture'),
        FieldPanel('author_occupation'),
        FieldPanel('text'),
    ]

    graphql_fields = [
        GraphQLString("author"),
        GraphQLImage('author_picture'),
        GraphQLString("author_occupation"),
        GraphQLRichText('text')
    ]

    class Meta:
        verbose_name = _('Quote')
        verbose_name_plural = _('Quotes')

    def __str__(self):
        return f'{self.author} - {self.author_occupation}'


@register_snippet
class UserTag(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=60)
    description = RichTextField(help_text=_('Text'), verbose_name=_('Text'),
                                features=['h1', 'h2', 'h3', 'h4', 'h5', 'bold', 'link', 'hr'], blank=True, null=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
    ]

    class Meta:
        verbose_name = _('User Tag')
        verbose_name_plural = _('User Tags')

    def __str__(self):
        return f"{self.name}"


class Student(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='student', on_delete=models.CASCADE)
    group = models.ForeignKey(SpecializationGroup, related_name='students', null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = _('Student')
        verbose_name_plural = _('Students')

    def __str__(self):
        return f"{self.user}"


class StudentCard(TimeStampedModel):
    cardId = models.IntegerField(_('Student Card Id'), unique=True)
    issue_date = models.DateField(_('Issue Date'))
    credited_order = models.CharField(_('Credited Order'), max_length=150)
    valid_by = models.DateField(_('Valid By'))
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

    def __str__(self):
        return f"{self.student.user} - {self.cardId}"


class Teacher(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='teacher', on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, related_name='teachers')
    groups = models.ManyToManyField(SpecializationGroup, related_name='teachers')

    class Meta:
        verbose_name = _('Teacher')
        verbose_name_plural = _('Teachers')

    def __str__(self):
        return f"{self.user}"


class Entrant(TimeStampedModel):
    user = models.OneToOneField(User, verbose_name=_('User'), related_name='entrant', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Entrant')
        verbose_name_plural = _('Entrants')

    def __str__(self):
        return f"{self.user}"


class UserDocument(TimeStampedModel):
    user = models.ForeignKey(User, verbose_name=_('User'), related_name='documents', on_delete=models.CASCADE)
    name = models.CharField(_('Name'), max_length=100)
    file = models.FileField(_('File'), upload_to='userDocuments')
    file_type = models.CharField(_('File Type'), max_length=50)

    class Meta:
        verbose_name = _('User Document')
        verbose_name_plural = _('User Documents')

    def __str__(self):
        return f"{self.user} - {self.name}"
