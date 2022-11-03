from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from authentication.managers import CustomUserManager


class CustomUser(AbstractBaseUser):
    email = models.EmailField(_('Email'), unique=True)
    phone = models.CharField(_("Phone Number"), max_length=16, unique=True, null=True, blank=True)
    firstName = models.CharField(_('Name'), max_length=40)
    lastName = models.CharField(_('Surname'), max_length=80)
    patronymic = models.CharField(_('Patronymic'), max_length=80)
    picture = models.ImageField(_('Profile Picture'), upload_to='userPictures/')
    bgPicture = models.ImageField(_('Profile Background Picture'), upload_to='userBgPictures/')
    isStaff = models.BooleanField(_('Is Staff'), default=False)
    isSuperuser = models.BooleanField(_('Is Super User'), default=False)
    updatedAt = models.DateTimeField(_('Updated At'), auto_now=True)
    createdAt = models.DateTimeField(_('Created At'), auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'patronymic']

    objects = CustomUserManager()

    def get_full_name(self):
        return f'{self.lastName} {self.firstName}'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('User')
