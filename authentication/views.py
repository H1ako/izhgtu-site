from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect

from authentication.models import User


def back(request):
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logout_and_back(request):
    logout(request)

    return back(request)


def loginAuth(request):
    user = User.objects.get(profile__last_name="Соболев")
    user = authenticate(request, username=user.email, password="25256789")
    login(request, user)
    user: User = request.user

    # fix Object of type User is not JSON serializable
    userData = {
        "id": user.id,
        "email": user.email,
        "first_name": user.profile.first_name,
        "last_name": user.profile.last_name,
        "is_active": user.is_active,
        "is_student": user.is_student,
        "is_teacher": user.is_teacher,
        "is_entrant": user.is_entrant,
        "is_superuser": user.is_superuser,
        "is_staff": user.is_staff
    }

    return JsonResponse(userData, safe=False)


def getUser(request):
    user: User = request.user

    if user.is_authenticated:
        userData = {
            "id": user.id,
            "email": user.email,
            "first_name": user.profile.first_name,
            "last_name": user.profile.last_name,
            "is_active": user.is_active,
            "is_student": user.is_student,
            "is_teacher": user.is_teacher,
            "is_entrant": user.is_entrant,
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff
        }

        return JsonResponse(userData, safe=False)

    return JsonResponse({'status': 'not authenticated'}, safe=False)
