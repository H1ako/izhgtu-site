from django.db import models
from grapple.models import GraphQLForeignKey, GraphQLStreamfield, GraphQLImage
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.images.models import Image
from wagtail.models import Page

from users.models import Quote
from wagtail_headless_preview.models import HeadlessMixin

class TextWithShortVariantBlock(blocks.StructBlock):
    text = blocks.CharBlock(help_text='Основной Текст', max_length=255)
    short_text = blocks.CharBlock(help_text='Короткий Текст', max_length=255)
    size = blocks.ChoiceBlock(help_text='Размер Шрифта', default='normal', choices=[
        ('small', 'Маленький'),
        ('normal', 'Обычный'),
        ('big', 'Большой'),
    ])


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
        Quote,
        null=True,
        blank=True,
        verbose_name='Цитата',
        on_delete=models.SET_NULL,
        related_name='+',
    )

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
        GraphQLForeignKey('quote', content_type=Quote),
    ]

    graphql_fields = [
        GraphQLStreamfield('face_body'),
        GraphQLImage('face_Bg'),
        # GraphQLForeignKey('quote', content_type=Quote),
    ]

class TestPage(Page):
    pass


