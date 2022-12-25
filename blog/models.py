import graphene
from django.db import models
from django.utils.translation import gettext_lazy as _
from grapple.helpers import register_paginated_query_field

from grapple.models import (
    GraphQLString,
    GraphQLSnippet,
    GraphQLTag,
    GraphQLForeignKey,
    GraphQLRichText, GraphQLImage, GraphQLField,
)
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from taggit.models import TaggedItemBase
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from wagtail.models import Orderable, Page
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from wagtail_headless_preview.models import HeadlessMixin
from instance_selector.edit_handlers import InstanceSelectorPanel

from authentication.models import User
from blog.schema import FilterListType


BLOG_POST_PAGE_RICH_TEXT_FEATURES = [
    'h1', 'h2', 'h3',
    'image', 'embed',
    'bold', 'italic',
    'hr',
    'superscript', 'subscript',
    'blockquote',
    'link', 'document-link',
    'ol', 'ul'
]

BLOG_POST_PAGE_PARAMS = {
    'post_title': graphene.String(),
}


class BlogPostIndexPage(HeadlessMixin, Page):
    max_count = 1
    parent_page_types = [
        'home.HomePage'
    ]
    subpage_types = [
        'blog.BlogPostPage',
    ]

    face_title = models.CharField(_("Face Title"), max_length=100, blank=True, null=True)
    face_picture = models.ForeignKey(
        Image,
        verbose_name=_('Face Picture'),
        related_name="+",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    @property
    def filters(self):
        filters = [
            Filter('Категории', 'checkbox', 'categories', values=get_category_values()),
            Filter('Теги', 'checkbox', 'tags', values=get_tag_values()),
            Filter('Авторы', 'checkbox', 'authors', values=get_author_values()),
            Filter('Дата', 'date', 'post_date'),
        ]

        return filters

    content_panels = Page.content_panels + [
        FieldPanel("face_title"),
        FieldPanel("face_picture"),
    ]

    graphql_fields = [
        GraphQLString("face_title"),
        GraphQLImage("face_picture"),
        GraphQLField('filters', FilterListType, required=True),
    ]


@register_paginated_query_field("blogPost", "blogPosts", plural_item_required=True, query_params=BLOG_POST_PAGE_PARAMS)
class BlogPostPage(HeadlessMixin, Page):
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
    post_tags = ClusterTaggableManager(through='blog.BlogPostTag', blank=True)
    post_category = models.ForeignKey(
        'blog.BlogPostCategory',
        related_name="blog_post_pages",
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    post_body = RichTextField(_("Body"), null=True, blank=True, features=BLOG_POST_PAGE_RICH_TEXT_FEATURES)
    post_title = models.CharField(_("Title"), max_length=100)

    content_panels = Page.content_panels + [
        FieldPanel("post_picture"),
        FieldPanel("post_title"),
        FieldPanel("post_body"),
        InstanceSelectorPanel("post_author"),
        FieldPanel('post_category'),
        FieldPanel("post_tags"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField("post_title", partial_match=True),
        index.SearchField("post_category", partial_match=True),
        index.SearchField("post_tags", partial_match=True),
        index.SearchField("post_author", partial_match=True),
        index.SearchField("first_published_at", partial_match=True),
    ]

    graphql_fields = [
        GraphQLImage("post_picture"),
        GraphQLForeignKey('post_author', content_type='authentication.User'),
        GraphQLRichText("post_body"),
        GraphQLString("url", required=True),
        GraphQLString("post_title", required=True),
        GraphQLTag("post_tags", required=True),
        GraphQLSnippet("post_category", "blog.BlogPostCategory"),
    ]


@register_snippet
class BlogPostCategory(models.Model, index.Indexed):
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


class BlogPostTag(TaggedItemBase, index.Indexed):
    content_object = ParentalKey(
        "blog.BlogPostPage", verbose_name=_("Blog Post Page"), related_name="tagged_post_pages",
        on_delete=models.CASCADE
    )

    search_fields = Page.search_fields + [
        index.SearchField('tag', partial_match=True),
    ]


def Filter(name, field_type, slug, values=None):
    if values is None:
        values = []

    return {
        'name': name,
        'type': field_type,
        'slug': slug,
        'values': values
    }


def get_category_values():
    valuesEntries = BlogPostCategory.objects.all()

    return [{
        'name': category.name,
        'value': category.slug,
    } for category in valuesEntries]


def get_tag_values():
    valuesEntries = BlogPostTag.objects.all().order_by('tag__name').values('tag__name', 'tag__slug').distinct()

    return [{
        'name': tag['tag__name'],
        'value': tag['tag__slug'],
    } for tag in valuesEntries]


def get_author_values():
    valuesEntries = User.objects.all()

    return [{
        'name': author.full_name,
        'value': author.id,
    } for author in valuesEntries]

