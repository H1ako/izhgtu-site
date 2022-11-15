from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register
)

from .models import User


class UserAdmin(ModelAdmin):
    model = User
    menu_label = 'Users'
    menu_icon = 'fa-folder-open'
    add_to_settings_menu = True
    list_display = "__all__"
    list_filter = ('is_staff', 'is_superuser')
    ordering = ('lastName', 'firstName', 'patronymic')


modeladmin_register(UserAdmin)
