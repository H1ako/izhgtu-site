from django.db.models import Q
from django.contrib.auth import get_user_model

userModel = get_user_model()


class StudentCardIdOrEmailBackend(object):
    def authenticate(self, username=None, password=None, **kwargs):
        try:
            user = userModel.objects.get(
                Q(phone=username)
                | Q(email=username)
                | Q(student__studentCard__cardId=username)
            )
            if user.check_password(password):
                return user
        except userModel.DoesNotExist:
            userModel().set_password(password)
