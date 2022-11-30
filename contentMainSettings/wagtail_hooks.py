from django.db import models
from django.urls import reverse, path
from wagtail.core import hooks
from wagtail.admin.menu import MenuItem
from django.utils.translation import gettext_lazy as _
from wagtail.admin.views.account import BaseSettingsPanel
from .views import index

from wagtail.admin.views.account import BaseSettingsPanel
from wagtail import hooks


@hooks.register("register_admin_urls")
def register_calendar_url():
    return [
        path("main-content-settings/", index, name="main-content-settings"),
    ]


@hooks.register("register_settings_menu_item")
def register_main_content_settings_menu_item():
    return MenuItem(
        _("Main Settings"),
        reverse("main-content-settings"),
        classnames="icon icon-folder-inverse",
        order=10000,
    )
