from django.contrib import admin

from users.models import Student, Teacher, Entrant, StudentCard, UserDocument, UserTag, Quote
from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from django.utils.translation import gettext_lazy as _

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Entrant)
admin.site.register(StudentCard)
admin.site.register(UserDocument)
admin.site.register(UserTag)
