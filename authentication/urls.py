from django.http import HttpResponse
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from phone_verify.api import VerificationViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from authentication import views
from authentication.serializers import SMSAuthenticationViewSet


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user1(request):
    print(request.user)

    return HttpResponse(status=200)

urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
    path('log-in/', views.login, name='login'),
    path('new-user/', views.new_user, name='new-user'),
    path('social-auth', include('social_django.urls')),
    path("", include("drfpasswordless.urls")),
    path('phone_verify/register/', SMSAuthenticationViewSet.as_view({'post': 'register'}), name='register'),
    path('phone_verify/verify/', SMSAuthenticationViewSet.as_view({'post': 'verify'}), name='verify'),
    path('phone_verify/test/', SMSAuthenticationViewSet.as_view({'post': 'test'}), name='test'),
    path('phone_verify/user/', get_user1, name='test'),
]
