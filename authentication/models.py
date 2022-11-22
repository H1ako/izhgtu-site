from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _

from authentication.managers import CustomUserManager
from modelcluster.fields import ParentalManyToManyField


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('Email'), unique=True)
    phone = models.CharField(_("Phone Number"), max_length=16, unique=True, null=True, blank=True)
    firstName = models.CharField(_('Name'), max_length=40)
    lastName = models.CharField(_('Surname'), max_length=80)
    patronymic = models.CharField(_('Patronymic'), max_length=80)
    picture = models.ImageField(_('Profile Picture'), upload_to='userPictures/', blank=True, null=True)
    bgPicture = models.ImageField(_('Profile Background Picture'), upload_to='userBgPictures/', blank=True, null=True)
    is_staff = models.BooleanField(_('Is Staff'), default=False)
    is_active = models.BooleanField(_('Is Active'), default=False)
    is_superuser = models.BooleanField(_('Is Super User'), default=False)
    tags = ParentalManyToManyField('users.UserTag', verbose_name=_('Tags'), related_name='users')
    updatedAt = models.DateTimeField(_('Updated At'), auto_now=True)
    createdAt = models.DateTimeField(_('Created At'), auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'patronymic']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.getInfo()}"

    def getInfo(self):
        return f"{self.getFullName()} - {self.email}"

    def getMainName(self):
        return f'{self.lastName} {self.firstName}'

    def getFullName(self):
        return f'{self.getMainName()} {self.patronymic}'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
