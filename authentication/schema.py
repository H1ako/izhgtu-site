import graphene
from graphene_django import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    full_name = graphene.String(required=True)
    is_student = graphene.Boolean(required=True)
    is_teacher = graphene.Boolean(required=True)
    is_entrant = graphene.Boolean(required=True)
    picture_url = graphene.String()
    bg_picture_url = graphene.String()

    def resolve_picture_url(self: User, info):
        return self.picture.url

    def resolve_bg_picture_url(self: User, info):
        return self.bg_picture.url

    def resolve_is_student(self: User, info):
        return self.is_student

    def resolve_is_teacher(self: User, info):
        return self.is_teacher

    def resolve_is_entrant(self: User, info):
        return self.is_entrant

    def resolve_full_name(self: User, info):
        return self.full_name

    class Meta:
        model = User
        exclude = ('password', 'groups', 'user_permissions', 'is_superuser', 'is_staff')


class AuthUserQuery:
    auth_user = graphene.Field(UserType)

    # noinspection PyMethodMayBeStatic
    def resolve_auth_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user
