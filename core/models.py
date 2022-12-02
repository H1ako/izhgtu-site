from django.db import models
from grapple.models import GraphQLSnippet, GraphQLImage
from wagtail.admin.panels import MultiFieldPanel, FieldPanel
from wagtail.contrib.settings.models import BaseSetting
from wagtail.contrib.settings.registry import register_setting
from django.utils.translation import gettext_lazy as _
from wagtail.images.models import Image

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
    logo = models.ForeignKey(
        Image,
        verbose_name=_('Logo'),
        related_name='+',
        null=True,
        blank=False,
        on_delete=models.SET_NULL
    )

    panels = [
        MultiFieldPanel((
            FieldPanel('header'),
            FieldPanel('footer'),
        ), _('Main Blocks')),
        FieldPanel('logo'),
    ]

    graphql_fields = [
        GraphQLImage('logo'),
        GraphQLSnippet('header', snippet_model='core.Header'),
        GraphQLSnippet('footer', snippet_model='core.Footer'),
    ]
