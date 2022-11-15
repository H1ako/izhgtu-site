from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.images.models import Image
from wagtail.models import Page

from users.models import Quote
from wagtail_headless_preview.models import HeadlessMixin


# from wagtail.fields import RichTextField


class HomePage(HeadlessMixin, Page):
    # parent_page_types = []
    max_count = 1

    faceText = models.CharField('Лицевой текст', max_length=255, blank=True, null=True)
    faceBgImage = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        verbose_name='Лицевая фоновая картинка',
        on_delete=models.SET_NULL,
        related_name='+'
    )
    quote = models.ForeignKey(
        Quote,
        null=True,
        blank=True,
        verbose_name='Цитата',
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('faceText'),
        FieldPanel('faceBgImage'),
        FieldPanel('quote'),
    ]

    api_fields = [
        APIField('faceText'),
        APIField('faceBgImage'),
        APIField('quote'),
    ]


