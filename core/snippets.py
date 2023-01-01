from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.helpers import register_streamfield_block

from wagtail.snippets.models import register_snippet
from wagtailsvg.edit_handlers import SvgChooserPanel
from grapple.models import GraphQLString, GraphQLBoolean, GraphQLSnippet, GraphQLRichText, GraphQLStreamfield, \
    GraphQLPage, GraphQLCollection, GraphQLInt, GraphQLForeignKey
from wagtail.blocks import StructBlock, PageChooserBlock, URLBlock, CharBlock
from wagtail.fields import RichTextField, StreamField
from modelcluster.fields import ParentalManyToManyField
from wagtail.admin.panels import FieldPanel

from svg.models import SvgTyped


@register_snippet
class Location(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    address = models.CharField(_('Address'), max_length=300)
    description = models.CharField(_('Description'), max_length=200, null=True, blank=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('address'),
        FieldPanel('description'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('address', required=True),
        GraphQLString('description'),
    ]

    def __str__(self):
        return f"{self.name}"


@register_snippet
class Contact(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    address = models.CharField(f"{_('Phone/Email/Social')}", max_length=500)
    type = models.CharField(_('Type'), choices=(
        ('email', _('Email')),
        ('phone', _('Phone')),
        ('social', _('Social'))
    ), default='phone', max_length=100)

    panels = [
        FieldPanel('name'),
        FieldPanel('address'),
        FieldPanel('type', widget=forms.RadioSelect),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('address', required=True),
        GraphQLString('type', required=True),
    ]

    def __str__(self):
        return f"{self.name}"


@register_snippet
class Social(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    icon = models.ForeignKey(
        SvgTyped,
        verbose_name=_('Icon'),
        related_name='+',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    url = models.URLField(_('Url'))

    panels = [
        FieldPanel('name'),
        SvgChooserPanel('icon'),
        FieldPanel('url'),
    ]

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('name', required=True),
        GraphQLString('url', required=True),
        GraphQLForeignKey('icon', content_type=SvgTyped),
    ]

    def __str__(self):
        return f"{self.name}"


@register_snippet
class Header(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    locations = models.ManyToManyField(
        'core.Location',
        verbose_name=_('Location Addresses'),
        blank=True
    )
    contacts = models.ManyToManyField(
        'core.Contact',
        verbose_name=_('Contacts'),
        blank=True,
    )
    menu = models.ForeignKey(
        'menus.Menu',
        verbose_name=_('Menu'),
        on_delete=models.SET_NULL,
        null=True,
    )
    socials = models.ManyToManyField(
        'core.Social',
        verbose_name=_('Socials'),
        blank=True,
    )
    show_last_news_marquee = models.BooleanField(_('Show Last News Marquee'), default=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('locations', widget=forms.CheckboxSelectMultiple),
        FieldPanel('contacts', widget=forms.CheckboxSelectMultiple),
        FieldPanel('socials', widget=forms.CheckboxSelectMultiple),
        FieldPanel('menu'),
        FieldPanel('show_last_news_marquee'),
    ]

    graphql_fields = [
        GraphQLString('name', required=True),
        GraphQLCollection(
            GraphQLSnippet,
            'locations',
            'core.Location',
            item_required=True,
            required=True
        ),
        GraphQLCollection(
            GraphQLSnippet,
            'contacts',
            'core.Contact',
            item_required=True,
            required=True
        ),
        GraphQLCollection(
            GraphQLSnippet,
            'socials',
            'core.Social',
            item_required=True,
            required=True
        ),
        GraphQLSnippet('menu', snippet_model='menus.Menu'),
        GraphQLBoolean('show_last_news_marquee', required=True)
    ]

    def __str__(self):
        return f"{self.name}"


class FooterMenuLinkAbstract(StructBlock):
    name = CharBlock(help_text=_('Name'), max_length=100)

    class Meta:
        abstract = True


@register_streamfield_block
class FooterMenuLinkPage(FooterMenuLinkAbstract):
    page = PageChooserBlock(help_text=_('Page'))

    graphql_fields = [
        GraphQLString('name', required=True),
        GraphQLPage('page', required=True),
    ]


@register_streamfield_block
class FooterMenuLinkUrl(FooterMenuLinkAbstract):
    url = URLBlock(_('Url'))

    graphql_fields = [
        GraphQLString('name', required=True),
        GraphQLString('url', required=True),
    ]


@register_snippet
class Footer(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    right_description = RichTextField(_('Right Description'), features=(
        'h3',
        'h4',
        'h5',
        'bold',
        'link',
        'italic',
        'document-link',
        'hr',
        'blockquote'
    ))
    socials = models.ManyToManyField(
        'core.Social',
        verbose_name=_('Socials'),
        blank=True,
    )
    menu = StreamField((
        ('url', FooterMenuLinkUrl()),
        ('site_page', FooterMenuLinkPage()),
    ), use_json_field=True, blank=True, null=True)

    show_contact_form = models.BooleanField(_('Show Contact Form'), default=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('show_contact_form'),
        FieldPanel('socials', widget=forms.CheckboxSelectMultiple),
        FieldPanel('menu'),
        FieldPanel('right_description'),
    ]

    graphql_fields = [
        GraphQLString('name', required=True),
        GraphQLCollection(
            GraphQLSnippet,
            'socials',
            'core.Social',
            item_required=True,
            required=True
        ),
        GraphQLBoolean('show_contact_form', required=True),
        GraphQLRichText('right_description'),
        GraphQLStreamfield('menu')
    ]

    def __str__(self):
        return f"{self.name}"
