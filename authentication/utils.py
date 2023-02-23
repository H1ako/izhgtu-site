from random import randint

from django.contrib.auth import get_user_model


UserModel = get_user_model()


def generate_username_from_email(email: str):
    email_name = email.split("@")[0]
    random_numbers = str(randint(0, 99999)).rjust(5, '0')
    username = f"{email_name}{random_numbers}"

    try:
        UserModel.objects.get(username=username)

        return generate_username_from_email(email)
    except UserModel.DoesNotExist:
        pass

    return username
