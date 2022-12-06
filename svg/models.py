from django.utils.translation import gettext_lazy as _

from grapple.models import GraphQLString
from wagtailsvg.models import Svg


class TypedSvg(Svg):
    graphql_fields = [
        GraphQLString("title"),
        GraphQLString("file"),
        GraphQLString("width"),
        GraphQLString("height"),
        GraphQLString("focal_point_x"),
        GraphQLString("focal_point_y"),
        GraphQLString("focal_point_width"),
        GraphQLString("focal_point_height"),
        GraphQLString("file_size"),
        GraphQLString("created_at"),
        GraphQLString("updated_at"),
    ]

    class Meta:
        verbose_name = _("Svg")
        verbose_name_plural = _("Svg List")
        proxy = True
