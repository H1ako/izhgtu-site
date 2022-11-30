from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.models import GraphQLString, GraphQLForeignKey, GraphQLImage
from instance_selector.edit_handlers import InstanceSelectorPanel
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
        "blog.BlogPost",
        verbose_name=_("Post"),
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name="news_list",
    )

    panels = [
        FieldPanel("title"),
        FieldPanel("picture"),
        InstanceSelectorPanel("post"),
    ]

    graphql_fields = [
        GraphQLString("title", required=True),
        GraphQLImage("picture"),
        GraphQLForeignKey("post", content_type="blog.BlogPost"),
    ]

    search_fields = []

    def __str__(self):
        return f"{self.title} - {self.created_at}"

    class Meta:
        verbose_name = _("News")
        verbose_name_plural = _("News List")
