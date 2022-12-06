from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.models import (
    GraphQLString,
    GraphQLSnippet,
    GraphQLTag,
    GraphQLForeignKey,
    GraphQLRichText, GraphQLImage,
)
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from wagtail.models import Orderable, Page
from wagtail.snippets.models import register_snippet

from instance_selector.edit_handlers import InstanceSelectorPanel
from wagtail_headless_preview.models import HeadlessMixin

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

    graphql_fields = [
        GraphQLString("name", required=True),
        GraphQLString("slug", required=True),
        GraphQLString("description"),
    ]

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = _("Blog Post Category")
        verbose_name_plural = _("Blog Post Categories")


class BlogPostTag(TaggedItemBase):
    content_object = ParentalKey(
        "blog.BlogPostPage", verbose_name=_("Blog Post Page"), related_name="tagged_post_pages",
        on_delete=models.CASCADE
    )


# TODO: Fix bug: tags doesnt saves
class BlogPostPage(TimeStampedModel, HeadlessMixin, Page):
    subpage_types = []
    parent_page_types = [
        'blog.BlogPostIndexPage'
    ]

    post_picture = models.ForeignKey(
        Image,
        verbose_name=_('Picture'),
        related_name="+",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    post_author = models.ForeignKey(
        "authentication.User",
        verbose_name=_("Author"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="authored_post_pages",
    )
    post_tags = ClusterTaggableManager(through=BlogPostTag, blank=True)
    post_category = models.ForeignKey(
        BlogPostCategory,
        related_name="blog_post_pages",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    post_body = RichTextField(_("Body"), null=True, blank=True)
    post_title = models.CharField(_("Title"), max_length=100)

    content_panels = Page.content_panels + [
        FieldPanel("post_picture"),
        FieldPanel("post_title"),
        FieldPanel("post_body"),
        InstanceSelectorPanel("post_author"),
        FieldPanel('post_category'),
        FieldPanel("post_tags"),
    ]

    graphql_fields = [
        GraphQLImage("post_picture"),
        GraphQLForeignKey('post_author', content_type='authentication.User'),
        GraphQLRichText("post_body"),
        GraphQLString("post_title", required=True),
        GraphQLTag("post_tags", is_list=True, required=True),
        GraphQLSnippet("post_category", "blog.BlogPostCategory"),
    ]


class BlogPostIndexPage(HeadlessMixin, Page):
    max_count = 1
    parent_page_types = [
        'home.HomePage'
    ]
    subpage_types = [
        'blog.BlogPostPage',
    ]
