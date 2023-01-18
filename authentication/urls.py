from django.urls import path, include

from authentication import views


urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
    path('log-in/', views.loginAuth, name='login'),
    path('get-user/', views.getUser, name='get-user'),
    path('social-auth', include('social_django.urls')),
]
