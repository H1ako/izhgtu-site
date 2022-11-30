from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from authentication.models import User


@modeladmin_register
class UserAdmin(ModelAdmin):
    model = User
    menu_label = _("Users")
    menu_icon = "fa-folder-open"
    add_to_settings_menu = True
    list_display = (
        "last_name",
        "first_name",
        "patronymic",
        "is_staff",
        "is_superuser",
        "is_entrant",
    )
    list_filter = ("is_staff", "is_superuser")
    ordering = ("last_name", "first_name", "patronymic")


admin.site.register(User)
