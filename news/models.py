from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.models import GraphQLString, GraphQLImage, GraphQLPage, GraphQLInt
from wagtail.admin.panels import FieldPanel

from izhgtuSite.models import TimeStampedModel
from wagtail.images.models import Image


class News(TimeStampedModel):
    title = models.CharField(_("Title"), max_length=100)
    picture = models.ForeignKey(
        Image,
        verbose_name=_("Picture"),
        related_name="+",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    post = models.ForeignKey(
        "blog.BlogPostPage",
        verbose_name=_("Post Page"),
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="news_list",
    )

    panels = [
        FieldPanel("title"),
        FieldPanel("picture"),
        FieldPanel("post"),
    ]

    graphql_fields = [
        GraphQLInt("id", required=True),
        GraphQLString("title", required=True),
        GraphQLImage("picture"),
        GraphQLPage('post'),
        GraphQLString('updated_at', required=True),
        GraphQLString("created_at", required=True),
    ]

    search_fields = []

    def __str__(self):
        return f"{self.title} - {self.created_at}"

    class Meta:
        verbose_name = _("News")
        verbose_name_plural = _("News List")
