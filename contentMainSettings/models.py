from django.utils.translation import gettext_lazy as _
from django.db import models
from wagtail.models import Orderable, ClusterableModel


class Social(Orderable):
    title = models.CharField(_('Title'), max_length=100)


class Contact(Orderable):
    title = models.CharField(_('Title'), max_length=100)


class Location(Orderable):
    pass


class Header(ClusterableModel):
    title = models.CharField(_('Title'), max_length=100)
    menu = models.ForeignKey(
        'menus.Menu',
        related_name='headers',
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
    )

    def __str__(self):
        return f'{self.title}'


class Footer(ClusterableModel):
    title = models.CharField(_('Title'), max_length=100)
    menu = models.ForeignKey(
        'menus.Menu',
        related_name='footers',
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
    )

    def __str__(self):
        return f'{self.title}'


class MainContentSettings(models.Model):
    header = models.ForeignKey(
        Header,
        related_name='main_content_settings',
        on_delete=models.SET_NULL,
        blank=False,
        null=True
    )
    footer = models.ForeignKey(
        Footer,
        related_name='main_content_settings',
        on_delete=models.SET_NULL,
        blank=False,
        null=True
    )
