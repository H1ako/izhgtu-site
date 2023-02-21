from django.urls import path, include

from authentication import views
from authentication.views import SMSAuthenticationViewSet

urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
    path('new-user/', views.new_user, name='new-user'),
    path('social-auth', include('social_django.urls')),
    path('password/login/', views.password_login, name='new-user'),
    path('passwordless/send-code/', SMSAuthenticationViewSet.as_view({'post': 'register'}), name='send_code'),
    path('passwordless/update-mobile/', SMSAuthenticationViewSet.as_view({'post': 'update_user_mobile'}), name='update_mobile'),
    path('passwordless/login/', SMSAuthenticationViewSet.as_view({'post': 'login'}), name='login'),
]
