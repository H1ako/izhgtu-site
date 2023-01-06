from django.contrib import admin
from wagtail.contrib.modeladmin.options import (
    modeladmin_register,
    ModelAdmin,
    ModelAdminGroup,
)
from django.utils.translation import gettext_lazy as _

from users.models import Student, Teacher, Entrant, StudentCard, UserDocument, Profile, Achievement, UserAchievement, \
    UserContact
from users.snippets import UserTag, Quote


class StudentAdmin(ModelAdmin):
    model = Student
    menu_label = _("Students")
    menu_icon = "user"
    list_display = ("user", "group", "student_card")
    list_filter = ("group",)
    ordering = ("user__last_name", "user__first_name", "user__patronymic")


class StudentCardAdmin(ModelAdmin):
    model = StudentCard
    menu_label = _("Student Cards")
    menu_icon = "form"
    list_display = ("card_id", "student")
    ordering = (
        "student__user__last_name",
        "student__user__first_name",
        "student__user__patronymic",
        "card_id",
    )


class UserDocumentAdmin(ModelAdmin):
    model = UserDocument
    menu_label = _("User Documents")
    menu_icon = "doc-full-inverse"
    list_display = ("user", "name")
    ordering = ("user__last_name", "user__first_name", "user__patronymic", "name")


class TeacherAdmin(ModelAdmin):
    model = Teacher
    menu_label = _("Teachers")
    menu_icon = "user"
    list_display = ("user",)
    list_filter = ("subjects", "groups__group__name")
    ordering = (
        "user__last_name",
        "user__first_name",
        "user__patronymic",
        "groups__group__name",
        "subjects__name",
    )


class EntrantAdmin(ModelAdmin):
    model = Entrant
    menu_label = _("Entrants")
    menu_icon = "user"
    list_display = ("user",)
    ordering = ("user__last_name", "user__first_name", "user__patronymic")


class AchievementAdmin(ModelAdmin):
    model = Achievement
    menu_label = _("Achievements")
    menu_icon = "success"
    list_display = ("title", "short_description")
    ordering = ("title", )


@modeladmin_register
class UsersGroupAdmin(ModelAdminGroup):
    menu_label = _("Users")
    menu_icon = "group"
    add_to_settings_menu = False
    items = (
        StudentAdmin,
        StudentCardAdmin,
        EntrantAdmin,
        TeacherAdmin,
        UserDocumentAdmin,
        AchievementAdmin,
    )


class ProfileAdmin(ModelAdmin):
    model = Profile
    menu_label = _("Profiles")
    menu_icon = "user"
    list_display = ("user", )
    ordering = ("user__last_name", "user__first_name", "user__patronymic")


class UserAchievementAdmin(ModelAdmin):
    model = UserAchievement
    menu_label = _("User Achievements")
    menu_icon = "success"
    list_display = ("user_profile", "achievement", )
    ordering = ("achievement", "user_profile", )


class UserContactAdmin(ModelAdmin):
    model = UserContact
    menu_label = _("User Contacts")
    menu_icon = "group"
    list_display = ("user_profile", "title", "value", )
    ordering = ("title", "user_profile", )


@modeladmin_register
class ProfileGroupAdmin(ModelAdminGroup):
    menu_label = _("Profile Settings")
    menu_icon = "user"
    add_to_settings_menu = False
    items = (
        ProfileAdmin,
        UserAchievementAdmin,
        UserContactAdmin,
    )


admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Entrant)
admin.site.register(StudentCard)
admin.site.register(UserDocument)
admin.site.register(UserTag)
admin.site.register(Quote)
