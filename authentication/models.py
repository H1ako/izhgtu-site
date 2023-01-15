from django import forms
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
import graphene
from grapple.helpers import register_query_field
from grapple.models import GraphQLBoolean, GraphQLString, GraphQLCollection, GraphQLForeignKey, GraphQLInt, GraphQLField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.models import Page
from wagtail_headless_preview.models import HeadlessMixin

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


class LoginMethodType(graphene.ObjectType):
    name = graphene.String(required=True)
    label = graphene.String(required=True)
    enabled = graphene.Boolean(required=True)

    class Meta:
        interfaces = (graphene.relay.Node, )


LoginMethodListType = graphene.List(graphene.NonNull(LoginMethodType))


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
    def profile_url(self):
        return f"/profile/{self.id}"

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
        GraphQLString('profile_url', required=True),
    ]

    def __str__(self):
        return f"{self.info}"

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")


class LoginPage(HeadlessMixin, Page):
    max_count = 1
    parent_page_types = [
        'home.HomePage',
    ]
    subpage_types = []

    is_password_enabled = models.BooleanField(
        _("Enable Password Login"), default=True
    )
    is_phone_code_enabled = models.BooleanField(
        _("Enable Phone Code Login"), default=True
    )
    is_gos_uslugi_enabled = models.BooleanField(
        _("Enable GosUslugi Login"), default=True
    )
    is_vkontakte_enabled = models.BooleanField(
        _("Enable VKontakte Login"), default=True
    )

    @property
    def login_methods(self):
        methods = (
            {
                "name": "loginAndPassword",
                "label": "Через логин и пароль",
                "enabled": self.is_password_enabled,
            },
            {
                "name": "phoneCode",
                "label": "Через номер телефона",
                "enabled": self.is_phone_code_enabled,
            },
            {
                "name": "gosUslugi",
                "label": "Через Госуслуги",
                "enabled": self.is_gos_uslugi_enabled,
            },
            {
                "name": "vkontakte",
                "label": "Через ВКонтакте",
                "enabled": self.is_vkontakte_enabled,
            },
        )

        return [method for method in methods if method["enabled"]]

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("is_gos_uslugi_enabled"),
            FieldPanel("is_password_enabled"),
            FieldPanel("is_phone_code_enabled"),
        ], heading="Login Methods"),
    ]

    graphql_fields = [
        GraphQLBoolean('is_gos_uslugi_enabled', required=True),
        GraphQLBoolean('is_password_enabled', required=True),
        GraphQLBoolean('is_phone_code_enabled', required=True),
        GraphQLField('login_methods', LoginMethodListType, required=True),
    ]
