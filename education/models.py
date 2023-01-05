from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.models import GraphQLString, GraphQLInt, GraphQLForeignKey, GraphQLCollection
from instance_selector.edit_handlers import InstanceSelectorPanel
from wagtail.admin.panels import FieldPanel

from authentication.models import User
from izhgtuSite.models import TimeStampedModel


class Subject(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    panels = [
        FieldPanel("name")
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
    ]

    class Meta:
        verbose_name = _("Subject")
        verbose_name_plural = _("Subjects")

    def __str__(self):
        return f"{self.name}"


class EducationType(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    panels = [
        FieldPanel("name")
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
    ]

    class Meta:
        verbose_name = _("Education Type")
        verbose_name_plural = _("Education Types")

    def __str__(self):
        return f"{self.name}"


class Faculty(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=200, unique=True)
    education_type = models.ForeignKey(
        EducationType,
        verbose_name=_("Education Type"),
        related_name="faculties",
        null=True,
        on_delete=models.SET_NULL,
    )

    panels = [
        FieldPanel("name"),
        InstanceSelectorPanel("education_type"),
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
        GraphQLForeignKey("education_type", content_type='education.EducationType'),
    ]

    class Meta:
        verbose_name = _("Faculty")
        verbose_name_plural = _("Faculties")

    def __str__(self):
        return f"{self.name}"


class Specialization(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=200, unique=True)
    faculty = models.ForeignKey(
        Faculty,
        verbose_name=_("Faculty"),
        related_name="specializations",
        null=True,
        on_delete=models.SET_NULL,
    )

    panels = [
        FieldPanel("name"),
        InstanceSelectorPanel("faculty"),
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
        GraphQLForeignKey("faculty", content_type='education.Faculty'),
    ]

    class Meta:
        verbose_name = _("Specialization")
        verbose_name_plural = _("Specializations")

    def __str__(self):
        return f"{self.name}"


class EducationForm(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=200, unique=True)

    panels = [
        FieldPanel("name"),
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
    ]

    class Meta:
        verbose_name = _("Education Form")
        verbose_name_plural = _("Education Forms")

    def __str__(self):
        return f"{self.name}"


class SpecializationGroup(TimeStampedModel):
    name = models.CharField(_("Name"), max_length=100, unique=True)
    year = models.SmallIntegerField(_("Education Year"))
    education_form = models.ForeignKey(
        EducationForm,
        verbose_name=_("Education Form"),
        related_name="groups",
        null=True,
        on_delete=models.SET_NULL,
    )
    specialization = models.ForeignKey(
        Specialization,
        verbose_name=_("Specialization"),
        related_name="groups",
        null=True,
        on_delete=models.SET_NULL,
    )
    leader = models.ForeignKey(
        User,
        related_name="leaderOfGroups",
        verbose_name=_("Group Leader"),
        on_delete=models.SET_NULL,
        null=True,
    )
    subjects = models.ManyToManyField(
        Subject, verbose_name=_("Subjects"), related_name="groups"
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("year"),
        InstanceSelectorPanel("education_form"),
        InstanceSelectorPanel("specialization"),
        InstanceSelectorPanel("leader"),
        FieldPanel("subjects", widget=forms.CheckboxSelectMultiple),
    ]

    graphql_fields = [
        GraphQLString("name", required=True),
        GraphQLInt("year", required=True),
        GraphQLForeignKey("education_form", content_type='education.EducationForm', required=True),
        GraphQLForeignKey("specialization", content_type='education.Specialization', required=True),
        GraphQLForeignKey("leader", content_type='authentication.User', required=True),
        GraphQLCollection(
            GraphQLForeignKey,
            "subjects",
            'education.Subject',
            required=True,
            item_required=True
        ),
        GraphQLCollection(
            GraphQLForeignKey,
            "students",
            'users.Student',
            required=True,
            item_required=True
        ),
        GraphQLCollection(
            GraphQLForeignKey,
            "teachers",
            'education.GroupTeacher',
            required=True,
            item_required=True
        ),
    ]

    class Meta:
        verbose_name = _("Specialization Group")
        verbose_name_plural = _("Specialization Groups")

    def __str__(self):
        return f"{self.name}"


class GroupTeacher(models.Model):
    group = models.ForeignKey(
        'education.SpecializationGroup',
        verbose_name=_("Group"),
        related_name="teachers",
        on_delete=models.CASCADE,
    )
    teacher = models.ForeignKey(
        'users.Teacher',
        verbose_name=_("Teacher"),
        related_name="groups",
        on_delete=models.CASCADE,
    )
    subjects = models.ManyToManyField(
        'education.Subject', verbose_name=_("Subjects"), related_name="group_teachers"
    )

    panels = [
        InstanceSelectorPanel("group"),
        InstanceSelectorPanel("teacher"),
        FieldPanel("subjects", widget=forms.CheckboxSelectMultiple),
    ]

    graphql_fields = [
        GraphQLInt("id", required=True),
        GraphQLForeignKey("group", 'education.SpecializationGroup', required=True),
        GraphQLForeignKey("teacher", 'users.Teacher', required=True),
        GraphQLCollection(
            GraphQLForeignKey,
            "subjects",
            'education.Subject',
            required=True,
            item_required=True
        ),
    ]

    class Meta:
        verbose_name = _("Group Teacher")
        verbose_name_plural = _("Group Teachers")

    def __str__(self):
        return f"{self.group} - {self.teacher}"
