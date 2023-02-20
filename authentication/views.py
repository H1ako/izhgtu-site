from http import HTTPStatus
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from authentication.models import User


def back(request):
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logout_and_back(request):
    logout(request)

    return back(request)


class HttpResponseFieldMissing(HttpResponse):
    status_code = HTTPStatus.BAD_REQUEST


class HttpResponseAlreadySignedUp(HttpResponse):
    status_code = HTTPStatus.CONFLICT


class HttpUnauthorized(HttpResponse):
    status_code = HTTPStatus.UNAUTHORIZED


def new_user(request):
    user: User = request.user

    if not user.is_authenticated:
        return HttpUnauthorized()

    if user.is_signed_up:
        return HttpResponseAlreadySignedUp()

    firstName = request.POST.get('firstName')
    lastName = request.POST.get('lastName')
    patronymic = request.POST.get('patronymic')
    picture = request.FILES.get('picture', request.POST.get('picture'))
    birthDate = request.POST.get('birthDate')

    if None in [firstName, lastName, patronymic, birthDate] or 'null' in [firstName, lastName, patronymic, birthDate]:
        return HttpResponseFieldMissing()

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

    return HttpResponseRedirect('/')


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def password_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if None in [username, password]:
        return HttpResponseFieldMissing()

    user = authenticate(request, username=username, password=password)
    if not user:
        return Response({
            'error': 'Invalid username or password',
        }, status=HTTPStatus.NOT_FOUND)

    login(request, user)

    return Response(status=HTTPStatus.OK)
