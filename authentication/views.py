from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect

from authentication.models import User


def back(request):
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logout_and_back(request):
    logout(request)

    return back(request)


def newUser(request):
    user: User = request.user

    if not user.is_authenticated or user.is_signed_up:
        return back(request)

    firstName = request.POST.get('firstName')
    lastName = request.POST.get('lastName')
    patronymic = request.POST.get('patronymic')
    picture = request.FILES.get('picture', request.POST.get('picture'))
    birthDate = request.POST.get('birthDate')

    if None in [firstName, lastName, patronymic, birthDate] or 'null' in [firstName, lastName, patronymic, birthDate]:
        return JsonResponse({'status': 'error', 'message': 'Не все поля заполнены'}, safe=False)

    user.profile.first_name = firstName
    user.profile.last_name = lastName
    user.profile.patronymic = patronymic
    user.profile.birth_date = birthDate
    if type(picture) is not str:
        user.profile.picture = picture
    elif picture == 'DELETED':
        user.profile.picture = None

    user.is_signed_up = True
    user.profile.save()
    user.save()
    print(HttpResponseRedirect('/'))
    return HttpResponseRedirect('/')


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
