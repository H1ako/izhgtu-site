from phone_verify.api import VerificationViewSet
from phone_verify.serializers import SMSVerificationSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from phone_verify import serializers as phone_serializers
from rest_framework.response import Response


class SMSAuthenticationViewSet(VerificationViewSet):
    @action(
        detail=False,
        methods=['POST'],
        permission_classes=[AllowAny],
        serializer_class=SMSVerificationSerializer
    )
    def test(self, request):
        # serializer = phone_serializers.SMSVerificationSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        print(request.user)

        return Response(status=status.HTTP_200_OK)
