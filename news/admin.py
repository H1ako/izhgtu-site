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
    # add_to_admin_menu = True
    list_display = ('title',)
    search_fields = ('title',)
