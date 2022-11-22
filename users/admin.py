from django.contrib import admin

from users.models import Student, Teacher, Entrant, StudentCard, UserDocument, UserTag, Quote
from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from django.utils.translation import gettext_lazy as _


class QuoteAdmin(ModelAdmin):
    model = Quote
    menu_label = _('Quotes')
    menu_icon = 'openquote'
    menu_order = 200
    add_to_settings_menu = False
    exclude_from_explorer = True
    list_display = ('author', 'author_occupation')
    search_fields = ('author', 'author_occupation', 'text')


class UserTagAdmin(ModelAdmin):
    model = UserTag
    menu_label = _('User Tag')
    menu_icon = 'tag'
    menu_order = 300
    add_to_settings_menu = False
    exclude_from_explorer = True
    list_display = ('name',)
    search_fields = ('name', 'description')





modeladmin_register(UserTagAdmin)
modeladmin_register(QuoteAdmin)

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Entrant)
admin.site.register(StudentCard)
admin.site.register(UserDocument)
admin.site.register(UserTag)
