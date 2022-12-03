from django.db import models
from grapple.models import GraphQLSnippet, GraphQLForeignKey, GraphQLString
from wagtail.admin.panels import MultiFieldPanel, FieldPanel
from wagtail.contrib.settings.models import BaseSetting
from wagtail.contrib.settings.registry import register_setting
from django.utils.translation import gettext_lazy as _
from wagtail.images.models import Image
from wagtailsvg.edit_handlers import SvgChooserPanel
from wagtailsvg.models import Svg

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
        Svg,
        verbose_name=_('Logo'),
        related_name='+',
        null=True,
        blank=False,
        on_delete=models.SET_NULL
    )
    org_name = models.CharField(_('Organization Name'), max_length=100, null=True, blank=True)
    short_org_name = models.CharField(_('Short Organization Name'), max_length=20, null=True, blank=True)

    panels = [
        MultiFieldPanel((
            FieldPanel('short_org_name', heading=_('Short Organization Name')),
            FieldPanel('org_name', heading=_('Organization Main Name')),
        ), _('Organization Name')),
        SvgChooserPanel('logo', heading=_('Logo')),
        MultiFieldPanel((
            FieldPanel('header'),
            FieldPanel('footer'),
        ), _('Main Blocks')),
    ]

    graphql_fields = [
        GraphQLForeignKey('logo', content_type=Svg),
        GraphQLSnippet('header', snippet_model='core.Header'),
        GraphQLSnippet('footer', snippet_model='core.Footer'),
        GraphQLString('short_org_name'),
        GraphQLString('org_name'),
    ]
