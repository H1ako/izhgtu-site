from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from blog.models import BlogPost


@modeladmin_register
class BlogPostAdmin(ModelAdmin):
    model = BlogPost
    menu_label = _('Blog Posts')
    menu_icon = 'placeholder'
    menu_order = 300
    add_to_settings_menu = False
    exclude_from_explorer = False
    # add_to_admin_menu = True
    list_display = ('title', 'author',)
    search_fields = ('title', 'author',)
