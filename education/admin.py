from django.contrib import admin
from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register,
)
from django.utils.translation import gettext_lazy as _

from education.models import (
    EducationType,
    Faculty,
    Specialization,
    SpecializationGroup,
    Subject,
    EducationForm, GroupTeacher,
)


class SubjectAdmin(ModelAdmin):
    model = Subject
    menu_label = _("Subjects")
    menu_icon = "placeholder"
    list_display = ("name",)
    ordering = ("name",)
    search_fields = ("name",)


class EducationTypeAdmin(ModelAdmin):
    model = EducationType
    menu_label = _("Education Types")
    menu_icon = "placeholder"
    list_display = ("name",)
    ordering = ("name",)
    search_fields = ("name",)


class FacultyAdmin(ModelAdmin):
    model = Faculty
    menu_label = _("Faculties")
    menu_icon = "placeholder"
    list_display = ("name", "education_type")
    ordering = (
        "education_type",
        "name",
    )
    search_fields = ("name", "education_type__name")
    list_filter = ("education_type",)


class SpecializationAdmin(ModelAdmin):
    model = Specialization
    menu_label = _("Specializations")
    menu_icon = "placeholder"
    list_display = ("name", "faculty")
    ordering = (
        "faculty__education_type",
        "faculty",
        "name",
    )
    search_fields = ("name", "faculty", "faculty__education_type__name")
    list_filter = ("faculty", "faculty__education_type")


class EducationFormAdmin(ModelAdmin):
    model = EducationForm
    menu_label = _("Education Forms")
    menu_icon = "placeholder"
    list_display = ("name",)
    ordering = ("name",)
    search_fields = ("name",)


class SpecializationGroupAdmin(ModelAdmin):
    model = SpecializationGroup
    menu_label = _("Specialization Groups")
    menu_icon = "placeholder"
    list_display = ("name", "year", "specialization", "leader")
    ordering = (
        "specialization__faculty__education_type__name",
        "specialization__faculty__name",
        "specialization__name",
        "year",
        "name",
    )
    search_fields = (
        "year",
        "name",
        "leader__first_name",
        "leader__last_name",
        "leader__patronymic",
        "specialization__name",
        "specialization__faculty__name",
        "specialization__faculty__education_type__name",
    )
    list_filter = (
        "specialization",
        "specialization__faculty",
        "specialization__faculty__education_type",
    )


class GroupTeacherAdmin(ModelAdmin):
    model = GroupTeacher
    menu_label = _("Group teachers")
    menu_icon = "user"
    list_display = ("teacher", "subjects", "group")
    list_filter = ("subjects", "group__name", "teacher__user")
    ordering = (
        "teacher__user__last_name",
        "teacher__user__first_name",
        "teacher__user__patronymic",
        "group__name",
        "subjects__name",
    )


@modeladmin_register
class EducationGroupAdmin(ModelAdminGroup):
    menu_label = _("Education")
    menu_icon = "group"
    add_to_settings_menu = False
    items = (
        SubjectAdmin,
        EducationTypeAdmin,
        FacultyAdmin,
        SpecializationAdmin,
        SpecializationGroupAdmin,
        EducationFormAdmin,
        GroupTeacherAdmin
    )


admin.site.register(EducationType)
admin.site.register(Faculty)
admin.site.register(Specialization)
admin.site.register(SpecializationGroup)
admin.site.register(EducationForm)
admin.site.register(Subject)
