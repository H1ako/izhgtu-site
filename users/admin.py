from django.contrib import admin

from users.models import Student, Teacher, Entrant, StudentCard, UserDocument, UserTag


admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Entrant)
admin.site.register(StudentCard)
admin.site.register(UserDocument)
admin.site.register(UserTag)
