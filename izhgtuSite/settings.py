import os
from pathlib import Path
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-&xdf4urq!dajk_(d3w3q-bd^d$*+6rqfeo582vw61*50m)as-z'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost'
]

AUTHENTICATION_BACKENDS = (
    'authentication.backends.StudentCardIdOrEmailBackend',
    'django.contrib.auth.backends.ModelBackend'  # fallback to default authentication backend if first fails
)


# cms wagtail

GRAPHENE = {"SCHEMA": "grapple.schema.schema"}
GRAPPLE = {
    "APPS": ["home", 'users'],
}
ASGI_APPLICATION = "graphql_ws.django.routing.application"

WAGTAIL_SITE_NAME = 'ИжГТУ'
WAGTAILADMIN_BASE_URL = 'cms'

WAGTAIL_HEADLESS_PREVIEW = {
    "CLIENT_URLS": {
        "default": "http://localhost:3000",
    }
}

CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r"^/api/v2/"

# rest framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    # 'PAGE_SIZE': 10
}

# passwordless authentication
PASSWORDLESS_AUTH = {
    'PASSWORDLESS_AUTH_TYPES': ['EMAIL'],  # 'MOBILE'
    'PASSWORDLESS_EMAIL_NOREPLY_ADDRESS': 'noreply@istu.com',
    # 'PASSWORDLESS_MOBILE_NOREPLY_NUMBER': '+79123456789'
    # 'PASSWORDLESS_EMAIL_TOKEN_HTML_TEMPLATE_NAME': "mytemplate.html"
}

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Application definition
INSTALLED_APPS = [
    # 'djangocms_admin_style',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders",
    'rest_framework',
    'rest_framework.authtoken',
    # cms
    # 'sekizai',
    # 'sekizai.context_processors.sekizai',
    # 'django.contrib.sites',
    # 'cms',
    # 'menus',
    # 'treebeard',
    # 'filer',
    # 'easy_thumbnails',
    # 'mptt',
    # 'djangocms_text_ckeditor',
    # 'djangocms_link',
    # 'djangocms_file',
    # 'djangocms_picture',
    # 'djangocms_video',
    # 'djangocms_googlemap',
    # 'djangocms_snippet',
    # 'djangocms_style',
    # cms wagtail
    'wagtail.contrib.modeladmin',
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail',
    'modelcluster',
    'taggit',
    'wagtail.api.v2',
    # wagtail libs
    "wagtail_headless_preview",
    'wagtailmedia',
    "graphql_ws.django",
    "grapple",
    "graphene_django",
    "channels",
    # libraries
    'drfpasswordless',
    # 'django_nextjs.apps.DjangoNextJSConfig',
    # apps
    'frontend',
    'contentMainSettings',
    'menus',
    'home',
    'authentication',
    'users',
    'education',
    'dateEvents',
    'admissionApplications',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # cms
    # 'cms.middleware.user.CurrentUserMiddleware',
    # 'cms.middleware.page.CurrentPageMiddleware',
    # 'cms.middleware.toolbar.ToolbarMiddleware',
    # 'cms.middleware.language.LanguageCookieMiddleware',
    # cms wagtail
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'izhgtuSite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend/build'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # cms
            ],
        },
    },
]

WSGI_APPLICATION = 'izhgtuSite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'izhgtu-site',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    },
    'extra': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGES = [
    ('en', _('English')),
    ('ru', _('Russian')),
]

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = 'authentication.User'

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'assets/'

STATICFILES_DIRS = [
    BASE_DIR / 'frontend/build/static/',
    BASE_DIR / 'frontend/src/static/',
]

MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media/'


# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
