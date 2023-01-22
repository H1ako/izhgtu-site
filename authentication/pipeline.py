from users.models import Profile

USER_FIELDS = ['email']
PROFILE_FIELDS = ['first_name', 'last_name', 'patronymic']


def get_profile(strategy, details, backend, user=None, *args, **kwargs):
    profile_fields = dict((name, kwargs.get(name, details.get(name)))
                          for name in backend.setting('PROFILE_FIELDS', PROFILE_FIELDS))
    if not profile_fields:
        return

    Profile.objects.update_or_create(user=user, **profile_fields)

    return {
        'user': user,
    }


def get_avatar(strategy, details, backend, user=None, *args, **kwargs):
    if backend.name == 'vk-oauth2':
        avatar_url = kwargs.get('response', {}).get('photo_max', details.get('photo_max', None))
    else:
        avatar_url = None

    if kwargs.get('is_new', False) and avatar_url:
        user.profile.update_picture_from_url(avatar_url)

    return {
        'user': user,
    }
