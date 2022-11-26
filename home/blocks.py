from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtailmedia.blocks import VideoChooserBlock
from django.utils.translation import gettext_lazy as _


class VideoBlock(blocks.StructBlock):
    video = VideoChooserBlock(help_text=_('Video'))


class PictureBlock(blocks.StructBlock):
    picture = ImageChooserBlock(help_text=_('Image'))
    link = blocks.CharBlock(help_text=_('Link'), required=False, max_length=500)


class MediaSlideBlock(blocks.StreamBlock):
    video = VideoBlock()
    picture = PictureBlock()


