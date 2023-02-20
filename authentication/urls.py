from django.urls import path, include

from authentication import views
from authentication.serializers import SMSAuthenticationViewSet


urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
    path('new-user/', views.new_user, name='new-user'),
    path('social-auth', include('social_django.urls')),
    path('password/login/', views.password_login, name='new-user'),
    path('passwordless/send-code/', SMSAuthenticationViewSet.as_view({'post': 'register'}), name='send_code'),
    # path('passwordless/verify/', SMSAuthenticationViewSet.as_view({'post': 'verify'}), name='verify'),
    path('passwordless/verify/', SMSAuthenticationViewSet.as_view({'post': 'login'}), name='verify'),
]
