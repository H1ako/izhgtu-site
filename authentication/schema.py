import graphene
from graphene_django import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    is_student = graphene.Boolean(required=True)
    is_teacher = graphene.Boolean(required=True)
    is_entrant = graphene.Boolean(required=True)
    profile_url = graphene.String(required=True)

    def resolve_is_student(self, info):
        return self.is_student

    def resolve_is_teacher(self, info):
        return self.is_teacher

    def resolve_is_entrant(self, info):
        return self.is_entrant

    class Meta:
        model = User
        exclude = ('password', 'groups', 'user_permissions', 'is_superuser', 'is_staff')


class AuthUserQuery:
    auth_user = graphene.Field(UserType)

    # noinspection PyMethodMayBeStatic
    def resolve_auth_user(self, info):
        user = info.context.user

        if user.is_anonymous:
            return None
        return user


class LoginMethodType(graphene.ObjectType):
    name = graphene.String(required=True)
    label = graphene.String(required=True)
    enabled = graphene.Boolean(required=True)

    class Meta:
        interfaces = (graphene.relay.Node, )


LoginMethodListType = graphene.List(graphene.NonNull(LoginMethodType))
