import graphene
from django import forms
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from grapple.helpers import register_query_field
from grapple.models import GraphQLBoolean, GraphQLString, GraphQLCollection, GraphQLForeignKey, GraphQLInt, \
    GraphQLImage, GraphQLField
from wagtail.admin.panels import FieldPanel

from authentication.managers import CustomUserManager
from izhgtuSite.models import TimeStampedModel


user_params = {
    "id": graphene.Int(),
    "first_name": graphene.String(),
    "last_name": graphene.String(),
    "patronymic": graphene.String(),
    "full_name": graphene.String(),
    "email": graphene.String(),
    "phone": graphene.String(),
}


@register_query_field("user", 'users', plural_item_required=True, query_params=user_params)
class User(TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email"), unique=True)
    phone = models.CharField(
        _("Phone Number"), max_length=17, unique=True, null=True, blank=True
    )
    first_name = models.CharField(_("Name"), max_length=40)
    last_name = models.CharField(_("Surname"), max_length=80)
    patronymic = models.CharField(_("Patronymic"), max_length=80)
    picture = models.ImageField(
        _("Profile Picture"), upload_to="userPictures/", blank=True, null=True
    )
    bg_picture = models.ImageField(
        _("Profile Background Picture"),
        upload_to="userBgPictures/",
        blank=True,
        null=True,
    )
    is_staff = models.BooleanField(_("Is Staff"), default=False)
    is_active = models.BooleanField(_("Is Active"), default=False)
    is_superuser = models.BooleanField(_("Is Super User"), default=False)
    tags = models.ManyToManyField(
        "users.UserTag", verbose_name=_("Tags"), related_name="users"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "patronymic"]

    objects = CustomUserManager()

    @property
    def picture_url(self):
        return self.picture.url

    @property
    def bg_picture_url(self):
        return self.bg_picture.url

    @property
    def is_entrant(self):
        return hasattr(self, "entrant")

    @property
    def is_teacher(self):
        return hasattr(self, "teacher")

    @property
    def is_student(self):
        return hasattr(self, "student")

    @property
    def main_name(self):
        return f"{self.last_name} {self.first_name}"

    @property
    def full_name(self):
        return f"{self.main_name} {self.patronymic}"

    @property
    def info(self):
        return f"{self.full_name} - {self.email}"

    search_fields = [
        GraphQLString('first_name', required=True),
    ]

    panels = [
        FieldPanel("email"),
        FieldPanel("phone"),
        FieldPanel("first_name"),
        FieldPanel("last_name"),
        FieldPanel("picture"),
        FieldPanel("bg_picture"),
        FieldPanel("is_staff"),
        FieldPanel("is_superuser"),
        FieldPanel("tags", widget=forms.CheckboxSelectMultiple),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('email', required=True),
        GraphQLString('phone'),
        GraphQLString('first_name', required=True),
        GraphQLString('last_name', required=True),
        GraphQLString('patronymic', required=True),
        GraphQLString('full_name', required=True),
        GraphQLString('main_name', required=True),
        GraphQLString('picture'),
        GraphQLString('bg_picture'),
        GraphQLString('picture_url'),
        GraphQLString('bg_picture_url'),
        GraphQLBoolean('is_superuser', required=True),
        GraphQLBoolean('is_staff', required=True),
        GraphQLCollection(
            GraphQLForeignKey,
            'tags',
            'users.UserTag',
            required=True,
            is_queryset=True,
            item_required=True
        ),
        GraphQLBoolean('is_entrant', required=True),
        GraphQLBoolean('is_student', required=True),
        GraphQLBoolean('is_teacher', required=True),
    ]

    def __str__(self):
        return f"{self.info}"

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

