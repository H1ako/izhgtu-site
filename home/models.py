from django.db import models
from grapple.models import GraphQLStreamfield, GraphQLImage, GraphQLSnippet, GraphQLString, \
    GraphQLCollection, GraphQLForeignKey, GraphQLInt
from wagtail.images.models import Image
from wagtail.models import Page
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import MultiFieldPanel, FieldPanel, InlinePanel
from wagtail.models import Orderable

from wagtail_headless_preview.models import HeadlessMixin
from django.utils.translation import gettext_lazy as _


class FaceHeading(Orderable):
    text = models.CharField(_('Text'), max_length=255,)
    short_text = models.CharField(_('Short text'), max_length=150)
    size = models.CharField(_('Size'), max_length=100, default='normal', choices=[
        ('small', 'Маленький'),
        ('normal', 'Обычный'),
        ('big', 'Большой'),
    ])

    page = ParentalKey('home.HomePage', related_name='headings', on_delete=models.CASCADE)

    graphql_fields = [
        GraphQLInt('id', required=True),
        GraphQLString('text', required=True),
        GraphQLString('short_text', required=True),
        GraphQLString('size', required=True),
    ]


class HomePage(HeadlessMixin, Page):
    max_count = 1

    face_bg = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        verbose_name='Лицевая фоновая картинка',
        on_delete=models.SET_NULL,
        related_name='+',
    )
    quote = models.ForeignKey(
        'users.Quote',
        null=True,
        blank=True,
        verbose_name='Цитата',
        on_delete=models.SET_NULL,
        related_name='+',
    )

    graphql_fields = [
        GraphQLCollection(
            GraphQLForeignKey, 'headings', FaceHeading, required=True, item_required=True
        ),
        GraphQLImage('face_bg'),
        GraphQLSnippet('quote', 'users.Quote'),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            InlinePanel('headings', heading='headings', label='heading'),
            FieldPanel('face_bg'),
        ], heading='Лицевой Блок'),
        FieldPanel('quote'),
    ]

    api_fields = [
        GraphQLStreamfield('face_body'),
        GraphQLImage('face_Bg'),
        GraphQLSnippet('quote', 'users.Quote'),
    ]

