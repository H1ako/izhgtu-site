from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponseRedirect, JsonResponse

from authentication.models import User


def back(request):
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logout_and_back(request):
    logout(request)

    return JsonResponse({'status': 'ok'})


def loginAuth(request):
    user = User.objects.get(last_name="Соболев")
    user = authenticate(request, username=user.email, password="25256789")
    login(request, user)
    user = request.user

    # fix Object of type User is not JSON serializable
    user = {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": user.is_active,
        "is_student": user.is_student,
        "is_teacher": user.is_teacher,
        "is_entrant": user.is_entrant,
        "is_superuser": user.is_superuser,
        "is_staff": user.is_staff
    }

    return JsonResponse(user, safe=False)
