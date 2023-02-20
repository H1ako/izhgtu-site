from http import HTTPStatus

from django.contrib.auth import login
from django.http import HttpResponse
from phone_verify.api import VerificationViewSet
from phone_verify.serializers import SMSVerificationSerializer
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import AllowAny, IsAuthenticated

from phone_verify import serializers as phone_serializers

from authentication.models import User


class SMSAuthenticationViewSet(VerificationViewSet):
    @action(
        detail=False,
        methods=['POST'],
        permission_classes=[NotAuthenticated],
        serializer_class=SMSVerificationSerializer
    )
    def login(self, request):
        serializer = phone_serializers.SMSVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mobile = serializer.validated_data.phone_number

        try:
            user = User.objects.get(mobile=mobile)

            login(request, user)
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
        mobile = serializer.validated_data.phone_number

        if user.mobile != mobile:
            user.mobile = mobile
            user.save()
        else:
            return HttpResponse(status=HTTPStatus.CONFLICT)

        return HttpResponse(status=HTTPStatus.OK)
