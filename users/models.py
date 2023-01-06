from annoying.fields import AutoOneToOneField
from django import forms
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from grapple.models import GraphQLForeignKey, GraphQLString, GraphQLCollection, GraphQLBoolean, GraphQLRichText, \
    GraphQLInt
from instance_selector.edit_handlers import InstanceSelectorPanel
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from wagtailsvg.edit_handlers import SvgChooserPanel
from wagtailsvg.models import Svg

from authentication.models import User
from education.models import SpecializationGroup, Subject
from izhgtuSite.models import TimeStampedModel
from svg.models import SvgTyped


class Profile(models.Model):
    user = AutoOneToOneField(User, verbose_name=_('User'), on_delete=models.CASCADE, related_name='profile',
                             primary_key=True)
    about_me = models.TextField(_('About me'), blank=True, null=True)

    panels = [
        FieldPanel('user'),
        FieldPanel('about_me'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLForeignKey('user', 'authentication.User', required=True),
        GraphQLString('about_me'),
        GraphQLCollection(
            GraphQLForeignKey,
            'achievements',
            'users.UserAchievement',
            item_required=True,
            required=True
        ),
        GraphQLCollection(
            GraphQLForeignKey,
            'contacts',
            'users.UserContact',
            item_required=True,
            required=True
        ),
    ]

    def __str__(self):
        return self.user.full_name

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')


class Achievement(TimeStampedModel):
    title = models.CharField(_('Title'), max_length=255)
    description = RichTextField(verbose_name=_('Description'), blank=True, null=True,
                                features=['bold', 'italic', 'link', 'hr', 'document-link'])
    short_description = models.CharField(max_length=100, blank=True, null=True)
    icon = models.ForeignKey(
        SvgTyped,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('description'),
        FieldPanel('short_description'),
        SvgChooserPanel('icon'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('title', required=True),
        GraphQLRichText('description'),
        GraphQLString('short_description'),
        GraphQLForeignKey('icon', SvgTyped),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Achievement')
        verbose_name_plural = _('Achievements')


class UserAchievement(TimeStampedModel):
    user_profile = models.ForeignKey('users.Profile', on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey('users.Achievement', on_delete=models.CASCADE, related_name='users_achievements')
    show_in_profile = models.BooleanField(default=True)

    panels = [
        InstanceSelectorPanel('user_profile'),
        InstanceSelectorPanel('achievement'),
        FieldPanel('show_in_profile'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLForeignKey('user_profile', 'users.Profile', required=True),
        GraphQLForeignKey('achievement', 'users.Achievement', required=True),
        GraphQLBoolean('show_in_profile', required=True),
    ]

    def __str__(self):
        return f'{self.user_profile.user} - {self.achievement}'

    class Meta:
        verbose_name = _('User achievement')
        verbose_name_plural = _('User achievements')
        unique_together = ('user_profile', 'achievement')


class UserContact(TimeStampedModel):
    user_profile = models.ForeignKey('users.Profile', on_delete=models.CASCADE, related_name='contacts')
    title = models.CharField(max_length=50)
    value = models.CharField(max_length=500)

    panels = [
        InstanceSelectorPanel('user_profile'),
        FieldPanel('title'),
        FieldPanel('value'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLForeignKey('user_profile', 'users.Profile', required=True),
        GraphQLString('title', required=True),
        GraphQLString('value', required=True),
    ]

    def __str__(self):
        return f'{self.user_profile.user} - {self.title}'

    class Meta:
        verbose_name = _('User contact')
        verbose_name_plural = _('User contacts')
        unique_together = ('user_profile', 'title', 'value')


class Student(TimeStampedModel):
    user = models.OneToOneField(
        User, verbose_name=_("User"), related_name="student", on_delete=models.CASCADE
    )
    group = models.ForeignKey(
        SpecializationGroup,
        related_name="students",
        null=True,
        on_delete=models.SET_NULL,
    )
    learning_building = models.CharField(_('Learning building'), max_length=255, blank=True, null=True)

    panels = [
        GraphQLInt('id', required=True),
        InstanceSelectorPanel("user"),
        InstanceSelectorPanel("group"),
        FieldPanel("learning_building"),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLForeignKey('user', content_type='authentication.User', required=True),
        GraphQLForeignKey("group", content_type='education.SpecializationGroup', required=True),
        GraphQLForeignKey("student_card", required=True, content_type='users.StudentCard'),
        GraphQLString("learning_building"),
    ]

    class Meta:
        verbose_name = _("Student")
        verbose_name_plural = _("Students")

    def __str__(self):
        return f"{self.user}"


class StudentCard(TimeStampedModel):
    card_id = models.CharField(_("Student Card Id"), unique=True, max_length=100)
    issue_date = models.DateField(_("Issue Date"))
    credited_order = models.CharField(_("Credited Order"), max_length=150)
    valid_by = models.DateField(_("Valid By"))
    student = models.OneToOneField(
        Student,
        verbose_name=_("Student"),
        related_name="student_card",
        on_delete=models.SET_NULL,
        null=True,
    )

    panels = [
        FieldPanel("card_id"),
        FieldPanel("issue_date"),
        FieldPanel("credited_order"),
        FieldPanel("valid_by"),
        InstanceSelectorPanel("student"),
    ]

    graphql_fields = [
        GraphQLString("card_id", required=True),
        GraphQLString("issue_date", required=True),
        GraphQLString("credited_order", required=True),
        GraphQLString("valid_by", required=True),
        GraphQLForeignKey("student", content_type='users.Student'),
    ]

    class Meta:
        verbose_name = _("Student Card")
        verbose_name_plural = _("Student Cards")

    def __str__(self):
        return f"{self.card_id}"


class Teacher(TimeStampedModel):
    user = models.OneToOneField(
        'authentication.User', verbose_name=_("User"), related_name="teacher", on_delete=models.CASCADE
    )
    subjects = models.ManyToManyField(Subject, related_name="teachers")

    panels = [
        InstanceSelectorPanel("user"),
        FieldPanel("subjects", widget=forms.CheckboxSelectMultiple),
    ]

    graphql_fields = [
        GraphQLForeignKey('user', content_type='authentication.User', required=True),
        GraphQLCollection(
            GraphQLForeignKey,
            "subjects",
            'education.Subject',
            required=True,
            item_required=True
        ),
        GraphQLCollection(
            GraphQLForeignKey,
            "groups",
            'education.GroupTeacher',
            required=True,
            item_required=True
        )
    ]

    class Meta:
        verbose_name = _("Teacher")
        verbose_name_plural = _("Teachers")

    def __str__(self):
        return f"{self.user}"


class Entrant(TimeStampedModel):
    user = models.OneToOneField(
        'authentication.User', verbose_name=_("User"), related_name="entrant", on_delete=models.CASCADE
    )

    panels = [
        InstanceSelectorPanel("user"),
    ]

    graphql_fields = [
        GraphQLForeignKey('user', content_type='authentication.User', required=True),
    ]

    class Meta:
        verbose_name = _("Entrant")
        verbose_name_plural = _("Entrants")

    def __str__(self):
        return f"{self.user}"


class UserDocument(TimeStampedModel):
    user = models.ForeignKey(
        'authentication.User', verbose_name=_("User"), related_name="documents", on_delete=models.CASCADE
    )
    name = models.CharField(_("Name"), max_length=100)
    file = models.FileField(_("File"), upload_to="user_documents")

    @property
    def file_url(self):
        return self.file.url

    panels = [
        InstanceSelectorPanel("user"),
        FieldPanel("name"),
        FieldPanel("file"),
    ]

    graphql_fields = [
        GraphQLForeignKey('user', content_type='authentication.User', required=True),
        GraphQLString("name", required=True),
        GraphQLString("file", required=True),
        GraphQLString("file_url", required=True),
    ]

    class Meta:
        verbose_name = _("User Document")
        verbose_name_plural = _("User Documents")

    def __str__(self):
        return f"{self.user} - {self.name}"
