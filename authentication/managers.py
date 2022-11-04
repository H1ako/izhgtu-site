from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('isSuperuser', False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('isSuperuser', True)
        extra_fields.setdefault('isStaff', True)

        if extra_fields.get('isStaff') is not True:
            raise ValueError('Superuser must have isStaff=True.')
        if extra_fields.get('isSuperuser') is not True:
            raise ValueError('Superuser must have isSuperuser=True.')

        return self._create_user(email, password, **extra_fields)