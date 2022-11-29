from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from wagtail.contrib.modeladmin.options import modeladmin_register, ModelAdmin

from news.models import News


@modeladmin_register
class NewsAdmin(ModelAdmin):
    model = News
    menu_label = _('News')
    menu_icon = 'site'
    menu_order = 200
    add_to_settings_menu = False
    exclude_from_explorer = False
    list_display = ('title', 'post', 'created_at')
    search_fields = (
        'title',
        'post__title',
        'post__author__first_name',
        'post__author__last_name',
        'post__author__patronymic',
        'created_at'
    )
