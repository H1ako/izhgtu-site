from django.urls import path, include

from authentication import views

urlpatterns = [
    path('log-out/', views.logout_and_back, name='logout'),
]