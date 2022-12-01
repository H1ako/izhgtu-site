from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register



# @modeladmin_register
# class BlogPostAdmin(ModelAdmin):
#     model = BlogPost
#     menu_label = _("Blog Posts")
#     menu_icon = "placeholder"
#     menu_order = 300
#     add_to_settings_menu = False
#     exclude_from_explorer = False
#     list_display = ("title", "author", "category")
#     search_fields = (
#         "title",
#         "author__first_name",
#         "author__last_name",
#         "author__patronymic",
#         "category__name",
#     )
#     list_filter = ("author", "category", "tags")
