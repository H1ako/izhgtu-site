from http import HTTPStatus

from django.contrib.auth import logout, authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from phone_verify.api import VerificationViewSet
from phone_verify.serializers import SMSVerificationSerializer
from phone_verify import serializers as phone_serializers

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


class SMSAuthenticationViewSet(VerificationViewSet):
    @action(
        detail=False,
        methods=['POST'],
        permission_classes=[AllowAny],
        serializer_class=SMSVerificationSerializer,
    )
    def login(self, request):
        serializer = phone_serializers.SMSVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile = serializer.validated_data.get('phone_number')

        try:
            user = User.objects.get(mobile=mobile)

            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        except User.DoesNotExist:
            return HttpResponse(status=HTTPStatus.NOT_FOUND)

        return HttpResponse(status=HTTPStatus.OK)

    @action(
        detail=False,
        methods=['POST'],
        permission_classes=[IsAuthenticated],
        serializer_class=SMSVerificationSerializer
    )
    def update_user_mobile(self, request):
        serializer = phone_serializers.SMSVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        mobile = serializer.validated_data.get('phone_number')

        try:
            user_with_mobile = User.objects.get(mobile=mobile)

            return HttpResponse(status=HTTPStatus.CONFLICT)
        except User.DoesNotExist:
            user.mobile = mobile
            user.save()

        return HttpResponse(status=HTTPStatus.OK)


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
