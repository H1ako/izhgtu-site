import os
from pathlib import Path

from corsheaders.defaults import default_headers
from django.utils.translation import gettext_lazy as _
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
BASE_URL = "http://127.0.0.1:8000"


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-&xdf4urq!dajk_(d3w3q-bd^d$*+6rqfeo582vw61*50m)as-z"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
VK_SOCIAL_AUTH_RAISE_EXCEPTIONS = True
SOCIAL_AUTH_RAISE_EXCEPTIONS = True
RAISE_EXCEPTIONS = True

ALLOWED_HOSTS = [
    "127.0.0.1",
    'localhost',
    "izhgtu.herokuapp.com",
]

# rest framework
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000'
]

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://127.0.0.1:8000',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:8000',
]

CORS_ALLOW_CREDENTIALS = True

X_FRAME_OPTIONS = "SAMEORIGIN"

# social auth
SOCIAL_AUTH_ALLOWED_REDIRECT_HOSTS = [
    'localhost',
    '127.0.0.1',
]

SOCIAL_AUTH_USER_MODEL = 'authentication.User'
SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = True
LOGIN_REDIRECT_URL = '/'
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/'
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = '/login/new-user/'
SOCIAL_AUTH_LOGIN_ERROR_URL = '/api/login-error/'

USE_X_FORWARDED_HOST = True
CSRF_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

# VKontakte
SOCIAL_AUTH_VK_OAUTH2_KEY = config('VK_APP_KEY')
SOCIAL_AUTH_VK_OAUTH2_SECRET = config('VK_APP_SECRET')
SOCIAL_AUTH_VK_APP_USER_MODE = 2
SOCIAL_AUTH_VK_OAUTH2_SCOPE = [
    'email',
    'offline',
]
SOCIAL_AUTH_VK_OAUTH2_EXTRA_DATA = [
    'photo_max',
]

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'authentication.pipeline.get_profile',
    'authentication.pipeline.get_avatar',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'authentication.pipeline.make_user_active',
)

AUTHENTICATION_BACKENDS = (
    'social_core.backends.vk.VKOAuth2',
    "authentication.backends.StudentCardIdOrEmailBackend",
    "django.contrib.auth.backends.ModelBackend",  # fallback to default authentication backend if first fails
)

# cms wagtail
GRAPHENE = {
    "SCHEMA": "grapple.schema.schema"
}
GRAPPLE = {
    "APPS": [
        "wagtailsvg",
        "svg",
        "core",
        "home",
        "news",
        "blog",
        "authentication",
        "education",
        "users",
        "menus",
    ],
    "EXPOSE_GRAPHIQL": True,
}
ASGI_APPLICATION = "graphql_ws.django.routing.application"

WAGTAIL_SITE_NAME = "ИжГТУ"
WAGTAILADMIN_BASE_URL = "cms"
WAGTAILSVG_UPLOAD_FOLDER = "svg"
TAGGIT_CASE_INSENSITIVE = True

EMAIL_HOST = 'smtp-relay.sendinblue.com'
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_PORT = 587

WAGTAILSEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'wagtail.search.backends.database',
        'AUTO_UPDATE': True,
    },
}

WAGTAIL_HEADLESS_PREVIEW = {
    "CLIENT_URLS": {
        "default": "http://localhost:3000",
    }
}

# rest framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# passwordless authentication
TWILIO_ACCOUNT_SID = config('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = config('TWILIO_AUTH_TOKEN')

PASSWORDLESS_AUTH = {
    "PASSWORDLESS_AUTH_TYPES": ["MOBILE"],
    "PASSWORDLESS_EMAIL_NOREPLY_ADDRESS": "noreply@istu.com",
    'PASSWORDLESS_MOBILE_NOREPLY_NUMBER': '+79123456789',
    'PASSWORDLESS_USER_MOBILE_FIELD_NAME': 'phone',
    "PASSWORDLESS_AUTH_PREFIX": 'passwordless/',
    'PASSWORDLESS_VERIFY_PREFIX': 'passwordless/verify/',

    # 'PASSWORDLESS_EMAIL_TOKEN_HTML_TEMPLATE_NAME': "mytemplate.html"
}

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    # cms wagtail
    "wagtail.contrib.modeladmin",
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail",
    "wagtail.contrib.settings",
    "modelcluster",
    "taggit",
    "wagtail.api.v2",
    # wagtail libs
    "wagtailmedia",
    "graphql_ws.django",
    "grapple",
    # "django_filters",
    "graphene_django",
    "wagtail_headless_preview",
    "graphene",
    "channels",
    "instance_selector",
    "generic_chooser",
    "wagtailsvg",
    # libraries
    "drfpasswordless",
    'social_django',
    "annoying",
    # apps
    "core",
    "svg",
    "menus",
    "authentication",
    "users",
    "education",
    "dateEvents",
    "admissionApplications",
    "home",
    "news",
    "blog",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.contrib.sites.middleware.CurrentSiteMiddleware",
    # cms wagtail
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
    "social_django.middleware.SocialAuthExceptionMiddleware",
]

ROOT_URLCONF = "izhgtuSite.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            # os.path.join(BASE_DIR, 'frontend/.next/'),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "wagtail.contrib.settings.context_processors.settings"
            ],
        },
    },
]

WSGI_APPLICATION = "izhgtuSite.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "izhgtu-site",
        "USER": "root",
        "PASSWORD": "root",
        "HOST": "localhost",
        "PORT": "3306",
    },
    "extra": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGES = [
    ("en", _("English")),
    ("ru", _("Russian")),
]

LANGUAGE_CODE = "ru"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = "authentication.User"

LOCALE_PATHS = (os.path.join(BASE_DIR, "locale"),)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static/")

STATICFILES_DIRS = [BASE_DIR / "core/static/"]

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media/"


# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
