from django.db import models
from grapple.models import GraphQLStreamfield, GraphQLImage, GraphQLSnippet, GraphQLForeignKey, GraphQLString
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.images.models import Image
from wagtail.models import Page
from grapple.helpers import register_streamfield_block

from wagtail_headless_preview.models import HeadlessMixin
from wagtail.images.api.fields import ImageRenditionField


@register_streamfield_block
class TextWithShortVariantBlock(blocks.StructBlock):
    text = blocks.CharBlock(help_text='Основной Текст', max_length=255)
    short_text = blocks.CharBlock(help_text='Короткий Текст', max_length=255)
    size = blocks.ChoiceBlock(help_text='Размер Шрифта', default='normal', choices=[
        ('small', 'Маленький'),
        ('normal', 'Обычный'),
        ('big', 'Большой'),
    ])

    graphql_fields = [
        GraphQLString('text'),
        GraphQLString('short_text'),
        GraphQLString('size'),
    ]


class HomePage(HeadlessMixin, Page):
    max_count = 1

    # face block
    face_body = StreamField(
        [
            (
                'heading',
                TextWithShortVariantBlock()
            )
        ],
        blank=True,
        use_json_field=True
    )
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
        GraphQLStreamfield('face_body'),
        GraphQLImage('face_bg'),
        GraphQLSnippet('quote', 'users.Quote'),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('face_body'),
            FieldPanel('face_bg'),
        ], heading='Лицевой Блок'),
        FieldPanel('quote'),
    ]

    api_fields = [
        GraphQLStreamfield('face_body'),
        GraphQLImage('face_Bg'),
        # GraphQLForeignKey('quote', content_type=Quote),
        GraphQLSnippet('quote', 'users.Quote'),
    ]


class TestPage(Page):
    pass


