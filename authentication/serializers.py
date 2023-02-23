from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from authentication.utils import generate_username_from_email

UserModel = get_user_model()


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        username = generate_username_from_email(validated_data['email'])

        user = UserModel.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=True
        )

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'phone',)


class PasswordSignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    password_again = serializers.CharField(required=True)

    def validate(self, attrs):
        attrs = super().validate(attrs)
        password = attrs.get("password", None)
        password_again = attrs.get("password_again", None)

        if password != password_again:
            raise serializers.ValidationError(_('Password for confirmation is not valid'))

        return attrs


class PasswordLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
