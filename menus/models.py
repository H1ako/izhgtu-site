from django.db import models
from django_extensions.db.fields import AutoSlugField
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import MultiFieldPanel, FieldPanel, InlinePanel, PageChooserPanel
from wagtail.models import Orderable, ClusterableModel

from django.utils.translation import gettext_lazy as _
from wagtail.snippets.models import register_snippet


@register_snippet
class Menu(ClusterableModel):
    title = models.CharField(_('Title'), max_length=255)
    slug = AutoSlugField(help_text=_('Slug'), populate_from='title', editable=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('slug'),
        ], heading=_('Menu')),
        InlinePanel('links_groups', label=_('Link'), heading=_('Links'))
    ]

    def __str__(self):
        return f"{self.title}"


class MenuItem(ClusterableModel):
    name = models.CharField(_('Name'), max_length=50)
    url = models.URLField(_('Custom URL '), blank=True, null=True, max_length=500)
    page = models.ForeignKey(
        'wagtailcore.Page',
        blank=True,
        null=True,
        related_name='+',
        on_delete=models.CASCADE
    )
    open_in_new_tab = models.BooleanField(_('Open in new tab'), default=False, blank=True)
    menu = ParentalKey('Menu', related_name='links_groups')

    panels = [
        FieldPanel('name'),
        FieldPanel('url'),
        PageChooserPanel('page'),
        FieldPanel('open_in_new_tab'),
        InlinePanel('links_groups', label=_('Sublink'), heading=_('Sublinks'))
    ]


class MenuItemLink(Orderable):
    name = models.CharField(_('Name'), max_length=50)
    url = models.URLField(_('Custom URL '), blank=True, null=True, max_length=500)
    page = models.ForeignKey(
        'wagtailcore.Page',
        blank=True,
        null=True,
        related_name='+',
        on_delete=models.CASCADE
    )
    open_in_new_tab = models.BooleanField(_('Open in new tab'), default=False, blank=True)
    menu_item = ParentalKey(MenuItem, related_name='links_groups')

    panels = [
        FieldPanel('name'),
        FieldPanel('url'),
        PageChooserPanel('page'),
        FieldPanel('open_in_new_tab'),
    ]
