from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from grapple.models import GraphQLSnippet, GraphQLForeignKey, GraphQLString
from wagtail.admin.panels import MultiFieldPanel, FieldPanel
from wagtail.contrib.settings.models import BaseSetting
from wagtail.contrib.settings.registry import register_setting
from wagtail.images.models import Image
from wagtailsvg.edit_handlers import SvgChooserPanel

from authentication.models import LoginPage, LoginNewUserPage
from core.snippets import Header, Footer
from svg.models import SvgTyped


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
        SvgTyped,
        verbose_name=_('Logo'),
        related_name='+',
        null=True,
        blank=False,
        on_delete=models.SET_NULL
    )
    yandex_map_url = models.URLField(_('Yandex Map Url'), max_length=500, null=True, blank=True)
    org_name = models.CharField(_('Organization Name'), max_length=100, null=True, blank=True)
    short_org_name = models.CharField(_('Short Organization Name'), max_length=20, null=True, blank=True)

    panels = [
        MultiFieldPanel((
            FieldPanel('short_org_name', heading=_('Short Organization Name')),
            FieldPanel('org_name', heading=_('Organization Main Name')),
        ), _('Organization Name')),
        FieldPanel('yandex_map_url'),
        SvgChooserPanel('logo', heading=_('Logo')),
        MultiFieldPanel((
            FieldPanel('header'),
            FieldPanel('footer'),
        ), _('Main Blocks')),
    ]

    graphql_fields = [
        GraphQLForeignKey('logo', content_type=SvgTyped),
        GraphQLSnippet('header', snippet_model='core.Header'),
        GraphQLSnippet('footer', snippet_model='core.Footer'),
        GraphQLString('yandex_map_url'),
        GraphQLString('short_org_name'),
        GraphQLString('org_name'),
    ]


class MainUrlsSettings(BaseSetting):
    @property
    def logout_url(self):
        return reverse('logout')

    @property
    def login_page_url(self):
        return LoginPage.objects.live().public().first().url

    @property
    def login_new_user_page_url(self):
        return LoginNewUserPage.objects.live().public().first().url

    graphql_fields = [
        GraphQLString('logout_url'),
        GraphQLString('login_page_url'),
        GraphQLString('login_new_user_page_url'),
    ]
