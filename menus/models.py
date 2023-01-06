from django.db import models
from grapple.models import GraphQLString, GraphQLCollection, GraphQLPage, GraphQLBoolean, GraphQLForeignKey, GraphQLInt
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import (
    MultiFieldPanel,
    FieldPanel,
    InlinePanel,
    PageChooserPanel,
)
from wagtail.models import Orderable, ClusterableModel

from django.utils.translation import gettext_lazy as _
from wagtail.snippets.models import register_snippet


@register_snippet
class Menu(ClusterableModel):
    title = models.CharField(_("Title"), max_length=255)

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("title"),
            ],
            heading=_("Menu"),
        ),
        InlinePanel("links_groups", label=_("Link"), heading=_("Links")),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('title', required=True),
        GraphQLCollection(
            GraphQLForeignKey,
            'links_groups',
            'menus.MenuItem',
            required=True,
            item_required=True),
    ]

    def __str__(self):
        return f"{self.title}"


class MenuItem(ClusterableModel):
    name = models.CharField(_("Name"), max_length=50)
    url = models.URLField(_("Custom URL"), blank=True, null=True, max_length=500)
    page = models.ForeignKey(
        "wagtailcore.Page",
        blank=True,
        null=True,
        related_name="+",
        on_delete=models.CASCADE,
    )
    open_in_new_tab = models.BooleanField(
        _("Open in new tab"), default=False, blank=True
    )
    menu = ParentalKey("Menu", related_name="links_groups")

    panels = [
        FieldPanel("name"),
        FieldPanel("url"),
        PageChooserPanel("page"),
        FieldPanel("open_in_new_tab"),
        InlinePanel("links_groups", label=_("Sublink"), heading=_("Sublinks")),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('url'),
        GraphQLPage('page'),
        GraphQLBoolean('open_in_new_tab'),
        GraphQLCollection(
            GraphQLForeignKey,
            'links_groups',
            'menus.MenuItemLinkGroup',
            item_required=True
        ),
    ]


class MenuItemLinkGroup(ClusterableModel):
    name = models.CharField(_("Name"), max_length=50)
    url = models.URLField(_("Custom URL"), blank=True, null=True, max_length=500)
    page = models.ForeignKey(
        "wagtailcore.Page",
        blank=True,
        null=True,
        related_name="+",
        on_delete=models.CASCADE,
    )
    open_in_new_tab = models.BooleanField(
        _("Open in new tab"), default=False, blank=True
    )
    menu_item = ParentalKey(
        MenuItem, related_name="links_groups", null=True, blank=True
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("url"),
        PageChooserPanel("page"),
        FieldPanel("open_in_new_tab"),
        InlinePanel(
            "links_groups", label=f"{_('Sublink')} - 2", heading=f"{_('Sublinks')} - 2"
        ),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('url'),
        GraphQLPage('page'),
        GraphQLBoolean('open_in_new_tab'),
        GraphQLCollection(
            GraphQLForeignKey,
            'links_groups',
            'menus.MenuItemLink',
            item_required=True
        ),
    ]


class MenuItemLink(Orderable):
    name = models.CharField(_("Name"), max_length=50)
    url = models.URLField(_("Custom URL"), blank=True, null=True, max_length=500)
    page = models.ForeignKey(
        "wagtailcore.Page",
        blank=True,
        null=True,
        related_name="+",
        on_delete=models.CASCADE,
    )
    open_in_new_tab = models.BooleanField(
        _("Open in new tab"), default=False, blank=True
    )
    link_group = ParentalKey(
        MenuItemLinkGroup, related_name="links_groups", null=True, blank=True
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("url"),
        PageChooserPanel("page"),
        FieldPanel("open_in_new_tab"),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('url'),
        GraphQLPage('page'),
        GraphQLBoolean('open_in_new_tab'),
    ]
