from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from education.models import SpecializationGroup, Subject
from izhgtuSite.models import TimeStampedModel
from users.managers import CustomUserManager


class UserTag(TimeStampedModel):
    name = models.CharField(_('Name'), max_length=60)
    description = models.CharField(_('Description'), max_length=255, null=True, blank=True)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(_('Email'), unique=True)
    phone = models.CharField(_("Phone Number"), max_length=16, unique=True, null=True, blank=True)
    firstName = models.CharField(_('Name'), max_length=40)
    lastName = models.CharField(_('Surname'), max_length=80)
    patronymic = models.CharField(_('Patronymic'), max_length=80)
    picture = models.ImageField(_('Profile Picture'), upload_to='userPictures/')
    bgPicture = models.ImageField(_('Profile Background Picture'), upload_to='userBgPictures/')
    tags = models.ManyToManyField(UserTag, verbose_name=_('Tags'), related_name='users')
    isStaff = models.BooleanField(_('Is Staff'), default=False)
    isSuperuser = models.BooleanField(_('Is Super User'), default=False)
    updatedAt = models.DateTimeField(_('Updated At'), auto_now=True)
    createdAt = models.DateTimeField(_('Created At'), auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'phone']

    objects = CustomUserManager()

    def get_full_name(self):
        return f'{self.lastName} {self.firstName}'

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('User')


class Student(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='student', on_delete=models.CASCADE)
    group = models.ForeignKey(SpecializationGroup, related_name='students', null=True, on_delete=models.SET_NULL)


class Teacher(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='teacher', on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject, related_name='teachers')
    groups = models.ManyToManyField(SpecializationGroup, related_name='teachers')


class Entrant(TimeStampedModel):
    user = models.OneToOneField(CustomUser, verbose_name=_('User'), related_name='entrant', on_delete=models.CASCADE)


class UserDocument(TimeStampedModel):
    user = models.ForeignKey(CustomUser, verbose_name=_('User'), related_name='documents', on_delete=models.CASCADE)
    name = models.CharField(_('Name'), max_length=100)
    file = models.FileField(_('File'), upload_to='userDocuments')
    fileType = models.CharField(_('File Type'), max_length=50)
