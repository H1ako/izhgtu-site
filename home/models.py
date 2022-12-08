from django.db import models
from grapple.models import (
    GraphQLStreamfield,
    GraphQLImage,
    GraphQLSnippet,
    GraphQLString,
    GraphQLCollection,
    GraphQLForeignKey,
    GraphQLInt,
)
from wagtail.fields import StreamField
from wagtail.images.models import Image
from wagtail.models import Page
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import MultiFieldPanel, FieldPanel, InlinePanel
from wagtail.models import Orderable

from wagtail_headless_preview.models import HeadlessMixin
from django.utils.translation import gettext_lazy as _

from home.blocks import MediaSlideBlock
from news.models import News


class HomePage(HeadlessMixin, Page):
    max_count = 1
    parent_page_types = []

    face_bg = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        verbose_name="Лицевая фоновая картинка",
        on_delete=models.SET_NULL,
        related_name="+",
    )

    more_info_carousel = StreamField(
        MediaSlideBlock(),
        use_json_field=True,
        null=True,
        blank=True,
    )

    quote = models.ForeignKey(
        "users.Quote",
        null=True,
        blank=True,
        verbose_name="Цитата",
        on_delete=models.SET_NULL,
        related_name="+",
    )

    @property
    def last_news(self):
        return News.objects.all().order_by("-created_at")[:9]

    graphql_fields = [
        GraphQLCollection(
            GraphQLForeignKey,
            "headings",
            "home.FaceHeading",
            required=True,
            item_required=True,
        ),
        GraphQLCollection(
            GraphQLForeignKey,
            "last_news",
            "news.News",
            required=True,
            item_required=True,
        ),
        GraphQLImage("face_bg", required=True),
        GraphQLStreamfield("more_info_carousel"),
        GraphQLSnippet("quote", "users.Quote"),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                InlinePanel("headings", heading="headings", label="heading"),
                FieldPanel("face_bg"),
            ],
            heading=_("Face Block"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("more_info_carousel"),
            ],
            heading=_("More Info Block"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("quote"),
            ],
            heading=_("Quote Block"),
        ),
    ]


class FaceHeading(Orderable):
    text = models.CharField(
        _("Text"),
        max_length=255,
    )
    short_text = models.CharField(_("Short text"), max_length=150)
    size = models.CharField(
        _("Size"),
        max_length=100,
        default="normal",
        choices=[
            ("small", "Маленький"),
            ("normal", "Обычный"),
            ("big", "Большой"),
        ],
    )

    page = ParentalKey(
        "home.HomePage", related_name="headings", on_delete=models.CASCADE
    )

    graphql_fields = [
        GraphQLInt("id", required=True),
        GraphQLString("text", required=True),
        GraphQLString("short_text", required=True),
        GraphQLString("size", required=True),
    ]
