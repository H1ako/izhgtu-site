import graphene
from graphene_django import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    full_name = graphene.String(required=True)
    is_student = graphene.Boolean(required=True)
    is_teacher = graphene.Boolean(required=True)
    is_entrant = graphene.Boolean(required=True)

    def resolve_is_student(self, info):
        return self.is_student

    def resolve_is_teacher(self, info):
        return self.is_teacher

    def resolve_is_entrant(self, info):
        return self.is_entrant

    def resolve_full_name(self, info):
        return self.full_name

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "patronymic",
            "is_superuser",
            "is_staff",
            "is_student",
            "is_teacher",
            "is_entrant",
            "full_name",
            "student",
            "teacher",
            "entrant",
            "tags",
            "email",
            "phone",
        )


class AuthUserQuery:
    auth_user = graphene.Field(UserType)

    # noinspection PyMethodMayBeStatic
    def resolve_auth_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user
