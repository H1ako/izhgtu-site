from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.urls import reverse
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


class SignMethodType(graphene.ObjectType):
    name = graphene.String(required=True)
    label = graphene.String(required=True)
    enabled = graphene.Boolean(required=True)
    url = graphene.String()

    class Meta:
        interfaces = (graphene.relay.Node, )


SignMethodListType = graphene.List(graphene.NonNull(SignMethodType))


@register_query_field("user", 'users', plural_item_required=True, query_params=user_params)
class User(TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email"), unique=True)
    phone = models.CharField(
        _("Phone Number"), max_length=17, unique=True, null=True, blank=True
    )
    is_staff = models.BooleanField(_("Is Staff"), default=False)
    is_active = models.BooleanField(_("Is Active"), default=False)
    is_superuser = models.BooleanField(_("Is Super User"), default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    @property
    def profile_url(self):
        return f"/profile/{self.id}"

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
    def info(self):
        return f"{self.profile.full_name} - {self.email}"

    panels = [
        FieldPanel("email"),
        FieldPanel("phone"),
        FieldPanel("is_staff"),
        FieldPanel("is_superuser"),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('email', required=True),
        GraphQLString('phone'),
        GraphQLBoolean('is_superuser', required=True),
        GraphQLBoolean('is_staff', required=True),
        GraphQLBoolean('is_entrant', required=True),
        GraphQLBoolean('is_student', required=True),
        GraphQLBoolean('is_teacher', required=True),
        GraphQLString('profile_url', required=True),
        GraphQLForeignKey(
            'profile',
            'users.Profile',
            required=True,
        )
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
    def sign_in_methods(self):
        methods = (
            SignMethod(
                name="loginAndPassword",
                label="Логин и пароль",
                enabled=self.is_password_enabled,
                url=None
            ),
            SignMethod(
                name="phoneCode",
                label="Код из СМС",
                enabled=self.is_phone_code_enabled,
                url=None
            ),
            SignMethod(
                name="gosUslugi",
                label="Госуслуги",
                enabled=self.is_gos_uslugi_enabled,
                url="/gosuslugi/signup/"
            ),
            SignMethod(
                name="vk-oauth2",
                label="ВКонтакте",
                enabled=self.is_vkontakte_enabled
            ),
        )

        return getEnabledSignMethods(methods)

    @property
    def sign_up_social_methods(self):
        methods = (
            SignMethod(
                name='vk-oauth2',
                label='ВКонтакте',
                enabled=self.is_vkontakte_enabled
            ),
            SignMethod(
                name='gosuslugi',
                label='Гос Услуги',
                enabled=self.is_gos_uslugi_enabled,
                url="/gosuslugi/signup/"
            ),
        )

        return getEnabledSignMethods(methods)

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("is_gos_uslugi_enabled"),
            FieldPanel("is_vkontakte_enabled"),
            FieldPanel("is_password_enabled"),
            FieldPanel("is_phone_code_enabled"),
        ], heading="Login Methods"),
    ]

    graphql_fields = [
        GraphQLBoolean('is_gos_uslugi_enabled', required=True),
        GraphQLBoolean('is_password_enabled', required=True),
        GraphQLBoolean('is_phone_code_enabled', required=True),
        GraphQLBoolean('is_vkontakte_enabled', required=True),
        GraphQLField('sign_in_methods', SignMethodListType, required=True),
        GraphQLField('sign_up_social_methods', SignMethodListType, required=True),
    ]


def SignMethod(name: str, label: str, enabled: bool, url: str or None='urlByName') -> dict:  # noqa
    return {
        "name": name,
        "label": label,
        "enabled": enabled,
        "url": reverse('social:begin', args=[name]) if url == 'urlByName' else url,
    }


def getEnabledSignMethods(methods: tuple or list) -> list:
    return [method for method in methods if method["enabled"]]
