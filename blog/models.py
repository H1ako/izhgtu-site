from django.db import models
from django import forms

from django.utils.translation import gettext_lazy as _
from grapple.models import (
    GraphQLString,
    GraphQLSnippet,
    GraphQLTag,
    GraphQLForeignKey,
    GraphQLRichText,
)
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from taggit.managers import TaggableManager
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable
from wagtail.snippets.models import register_snippet

from instance_selector.edit_handlers import InstanceSelectorPanel

from izhgtuSite.models import TimeStampedModel


@register_snippet
class BlogPostCategory(models.Model):
    name = models.CharField(_("Name"), max_length=100)
    slug = models.SlugField(
        _("Slug"),
        allow_unicode=True,
        max_length=255,
        help_text=_("Blog Post identifier"),
    )
    description = models.CharField(
        _("Description"), max_length=200, blank=True, null=True
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
        FieldPanel("description"),
    ]

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = _("Blog Post Category")
        verbose_name_plural = _("Blog Post Categories")


class BlogPostTag(TaggedItemBase):
    content_object = ParentalKey(
        "blog.BlogPost", verbose_name=_("Blog Post"), related_name="tagged_posts"
    )


class BlogPost(ClusterableModel, TimeStampedModel):
    author = models.ForeignKey(
        "authentication.User",
        verbose_name=_("Author"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="authored_posts",
    )
    tags = TaggableManager(through=BlogPostTag, blank=True)
    category = models.ForeignKey(
        BlogPostCategory,
        related_name="blog_posts",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    body = RichTextField(_("Body"), null=True, blank=True)
    title = models.CharField(_("Title"), max_length=100)

    panels = [
        FieldPanel("title"),
        FieldPanel("body"),
        InstanceSelectorPanel("author"),
        FieldPanel("category", widget=forms.RadioSelect),
        FieldPanel("tags"),
    ]

    graphql_fields = [
        # GraphQLForeignKey('author', content_type='authentication.User'),
        GraphQLRichText("body"),
        GraphQLString("title", required=True),
        GraphQLTag("tags", is_list=True, required=True),
        GraphQLSnippet("category", "blog.BlogPostCategory"),
    ]

    def __str__(self):
        return f"{self.title} - {self.author.get_full_name()}"

    class Meta:
        verbose_name = _("Blog Post")
        verbose_name_plural = _("Blog Posts")
