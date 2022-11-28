from grapple.helpers import register_streamfield_block
from grapple.models import GraphQLImage, GraphQLMedia, GraphQLString, GraphQLCollection
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtailmedia.blocks import VideoChooserBlock
from django.utils.translation import gettext_lazy as _


@register_streamfield_block
class VideoBlock(blocks.StructBlock):
    video = VideoChooserBlock(help_text=_('Video'))

    graphql_fields = [
        GraphQLMedia('video', required=True)
    ]


@register_streamfield_block
class PictureBlock(blocks.StructBlock):
    picture = ImageChooserBlock(help_text=_('Image'))
    link = blocks.CharBlock(help_text=_('Link'), required=False, max_length=500)

    graphql_fields = [
        GraphQLImage('picture', required=True),
        GraphQLString('link'),
    ]


class MediaSlideBlock(blocks.StreamBlock):
    video = VideoBlock()
    picture = PictureBlock()
