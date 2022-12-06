from django.utils.translation import gettext_lazy as _

from grapple.models import GraphQLString
from wagtailsvg.models import Svg


class SvgTyped(Svg):
    @property
    def url(self):
        return self.file.url

    graphql_fields = [
        GraphQLString("title", required=True),
        GraphQLString("file", required=True),
        GraphQLString("url", required=True),
        GraphQLString("width", required=True),
        GraphQLString("height", required=True),
        GraphQLString("focal_point_x", required=True),
        GraphQLString("focal_point_y", required=True),
        GraphQLString("focal_point_width", required=True),
        GraphQLString("focal_point_height", required=True),
        GraphQLString("file_size", required=True),
        GraphQLString("created_at", required=True),
        GraphQLString("updated_at", required=True),
    ]

    class Meta:
        verbose_name = _("Svg")
        verbose_name_plural = _("Svg List")
        proxy = True
