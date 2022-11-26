from django.contrib import admin

from users.models import Student, Teacher, Entrant, StudentCard, UserDocument
from users.snippets import UserTag, Quote


admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Entrant)
admin.site.register(StudentCard)
admin.site.register(UserDocument)
admin.site.register(UserTag)
admin.site.register(Quote)
