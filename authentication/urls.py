from django.urls import path, include

from authentication import views
from authentication.views import SMSAuthenticationViewSet, PasswordAuthentication

urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
    path('new-user/', views.new_user, name='new-user'),
    path('social-auth', include('social_django.urls')),
    path('password/login/', PasswordAuthentication.as_view({'post': 'login'}), name='password_login'),
    path('password/sign-up/', PasswordAuthentication.as_view({'post': 'sign_up'}), name='password_sign_up'),
    path('passwordless/send-code/', SMSAuthenticationViewSet.as_view({'post': 'register'}), name='send_code'),
    path('passwordless/update-mobile/', SMSAuthenticationViewSet.as_view({'post': 'update_user_mobile'}), name='update_mobile'),
    path('passwordless/login/', SMSAuthenticationViewSet.as_view({'post': 'login'}), name='login'),
]
