from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.contrib.auth import get_user_model


userModel = get_user_model()


class StudentCardIdOrEmailOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):  # noqa
        try:
            user = userModel.objects.get(
                Q(username=username)
                | Q(email=username)
                | Q(student__student_card__card_id=username)
            )
            if user.check_password(password):
                return user
        except userModel.DoesNotExist:
            pass
