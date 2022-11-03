from django.contrib import admin

from education.models import EducationType, Faculty, Specialization, SpecializationGroup, Subject


admin.site.register(EducationType)
admin.site.register(Faculty)
admin.site.register(Specialization)
admin.site.register(SpecializationGroup)
admin.site.register(Subject)
