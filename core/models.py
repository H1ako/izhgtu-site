from django.db import models
from wagtail.admin.panels import MultiFieldPanel, FieldPanel
from wagtail.contrib.settings.models import BaseSetting
from wagtail.contrib.settings.registry import register_setting
from django.utils.translation import gettext_lazy as _

from core.snippets import Header, Footer


@register_setting
class SocialSettings(BaseSetting):
    vk = models.URLField('VK', null=True, blank=True, max_length=500)
    telegram = models.URLField('Telegram', null=True, blank=True, max_length=500)
    youtube = models.URLField('YouTube', null=True, blank=True, max_length=500)

    panels = [
        MultiFieldPanel((
            FieldPanel('vk'),
            FieldPanel('telegram'),
            FieldPanel('youtube'),
        ))
    ]


@register_setting
class MainContentSettings(BaseSetting):
    header = models.ForeignKey(
        Header,
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
    )
    footer = models.ForeignKey(
        Footer,
        on_delete=models.SET_NULL,
        null=True,
        blank=False,
    )

    panels = [
        MultiFieldPanel((
            FieldPanel('header'),
            FieldPanel('footer'),
        ), _('Main Content Settings'))
    ]
