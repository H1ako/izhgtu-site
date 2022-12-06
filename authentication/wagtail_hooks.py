from wagtail.core import hooks
from .schema import AuthUserQuery


@hooks.register('register_schema_query')
def add_auth_user_query(query_mixins):
    query_mixins.append(
        AuthUserQuery
    )
