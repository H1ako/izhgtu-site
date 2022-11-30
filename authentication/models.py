from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from wagtail.admin.panels import FieldPanel

from authentication.managers import CustomUserManager
from modelcluster.fields import ParentalManyToManyField

from izhgtuSite.models import TimeStampedModel


class User(TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email"), unique=True)
    phone = models.CharField(
        _("Phone Number"), max_length=16, unique=True, null=True, blank=True
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
    tags = ParentalManyToManyField(
        "users.UserTag", verbose_name=_("Tags"), related_name="users"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "patronymic"]

    objects = CustomUserManager()

    panels = [
        FieldPanel("email"),
        FieldPanel("phone"),
        FieldPanel("first_name"),
        FieldPanel("last_name"),
        FieldPanel("picture"),
        FieldPanel("bg_picture"),
        FieldPanel("is_staff"),
        FieldPanel("is_superuser"),
        FieldPanel("tags"),
    ]

    def __str__(self):
        return f"{self.get_info()}"

    @property
    def is_entrant(self):
        return hasattr(self, "student")

    def get_info(self):
        return f"{self.get_full_name()} - {self.email}"

    def get_main_name(self):
        return f"{self.last_name} {self.first_name}"

    def get_full_name(self):
        return f"{self.get_main_name()} {self.patronymic}"

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
