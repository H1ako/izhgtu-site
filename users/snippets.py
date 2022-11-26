from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.snippets.models import register_snippet
from grapple.models import GraphQLImage, GraphQLString, GraphQLRichText
from django.utils.translation import gettext_lazy as _
from wagtail.images.models import Image


@register_snippet
class Quote(models.Model):
    title = models.CharField(_('Title'), max_length=50)
    author = models.CharField(_('Author'), max_length=250)
    author_picture = models.ForeignKey(
        Image,
        blank=True,
        null=True,
        verbose_name=_('Author Picture'),
        related_name='+',
        on_delete=models.SET_NULL
    )
    author_occupation = models.CharField(_('Author Occupation'), max_length=150, blank=True, null=True)
    text = RichTextField(help_text=_('Text'), verbose_name=_('Text'),
                         features=['h1', 'h2', 'h3', 'h4', 'h5', 'bold', 'link', 'hr'])

    panels = [
        FieldPanel('title'),
        FieldPanel('author'),
        FieldPanel('author_picture'),
        FieldPanel('author_occupation'),
        FieldPanel('text'),
    ]

    graphql_fields = [
        GraphQLString("title", required=True),
        GraphQLString("author", required=True),
        GraphQLImage('author_picture'),
        GraphQLString("author_occupation"),
        GraphQLRichText('text', required=True)
    ]

    class Meta:
        verbose_name = _('Quote')
        verbose_name_plural = _('Quotes')

    def __str__(self):
        return f'{self.author} - {self.title}'


@register_snippet
class UserTag(models.Model):
    name = models.CharField(_('Name'), max_length=60)
    description = RichTextField(help_text=_('Text'), verbose_name=_('Text'),
                                features=['h1', 'h2', 'h3', 'h4', 'h5', 'bold', 'link', 'hr'], blank=True, null=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
    ]

    class Meta:
        verbose_name = _('User Tag')
        verbose_name_plural = _('User Tags')

    def __str__(self):
        return f"{self.name}"
