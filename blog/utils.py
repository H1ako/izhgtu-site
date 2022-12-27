from types import MethodType

import graphene
from django.utils.translation import gettext_lazy as _
from grapple.helpers import register_field_middleware, register_graphql_schema
from grapple.registry import registry
from grapple.types.structures import PaginatedQuerySet
from grapple.utils import resolve_paginated_queryset
from wagtail.models import Page


def custom_register_paginated_query_field(
    field_name,
    plural_field_name=None,
    query_params=None,
    required=False,
    plural_required=False,
    plural_item_required=False,
    middleware=None,
):
    if not plural_field_name:
        plural_field_name = field_name + "s"

    def inner(cls):
        field_type = lambda: registry.models[cls]  # noqa: E731
        field_query_params = query_params
        if field_query_params is None:
            field_query_params = {"id": graphene.Int()}

            if issubclass(cls, Page):
                field_query_params["slug"] = graphene.Argument(
                    graphene.String, description=_("The page slug.")
                )
                field_query_params["url_path"] = graphene.Argument(
                    graphene.String, description=_("The page url path.")
                )
                field_query_params["token"] = graphene.Argument(
                    graphene.String, description=_("The preview token.")
                )

        def Mixin():
            # Generic methods to get all and query one model instance.
            def resolve_singular(self, _, info, **kwargs):
                # If no filters then return nothing.
                if not kwargs:
                    return None

                try:
                    # If is a Page then only query live/public pages.
                    if issubclass(cls, Page):
                        if "token" in kwargs and hasattr(
                            cls, "get_page_from_preview_token"
                        ):
                            return cls.get_page_from_preview_token(kwargs.get("token"))

                        qs = cls.objects.live().public()
                        url_path = kwargs.pop("url_path", None)
                        if url_path:
                            if not url_path.endswith("/"):
                                url_path += "/"
                            return qs.filter(
                                url_path__endswith=url_path, **kwargs
                            ).first()
                        return qs.get(**kwargs)

                    return cls.objects.get(**kwargs)
                except (cls.DoesNotExist, cls.MultipleObjectsReturned):
                    return None

            def resolve_plural(self, _, info, **kwargs):
                qs = cls.objects
                if issubclass(cls, Page):
                    qs = qs.live().public()
                    if "order" not in kwargs:
                        kwargs["order"] = "-first_published_at"

                    # make an array of kwargs without 'page', 'per_page', 'search_query', 'order'
                    # and pass it to resolve_paginated_queryset
                    kwargs_without_pagination = {k: v for k, v in kwargs.items() if k not in ['page', 'per_page', 'search_query', 'order']}
                    qs = qs.filter(**kwargs_without_pagination)

                return resolve_paginated_queryset(qs, info, **kwargs)

            # Create schema and add resolve methods
            schema = type(cls.__name__ + "Query", (), {})

            singular_field_type = field_type
            if required:
                singular_field_type = graphene.NonNull(field_type)

            setattr(
                schema,
                field_name,
                graphene.Field(singular_field_type, **field_query_params),
            )

            plural_field_type = field_type
            if plural_item_required:
                plural_field_type = graphene.NonNull(field_type)

            setattr(
                schema,
                plural_field_name,
                PaginatedQuerySet(plural_field_type, cls, required=plural_required, **field_query_params),
            )

            setattr(
                schema, "resolve_" + field_name, MethodType(resolve_singular, schema)
            )
            setattr(
                schema,
                "resolve_" + plural_field_name,
                MethodType(resolve_plural, schema),
            )
            return schema

        # Send schema to Grapple schema.
        register_graphql_schema(Mixin())
        return cls

    if middleware is not None:
        register_field_middleware(field_name, middleware)
        register_field_middleware(plural_field_name, middleware)

    return inner
