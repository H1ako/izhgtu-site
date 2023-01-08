from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.urls import path, include
# wagtail cms
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls
from grapple import urls as grapple_urls
from wagtail import urls as wagtail_urls

from authentication.models import User
from .api import apiRouter


def loginAuth(request):
    user = User.objects.get(last_name="Соболев")
    user = authenticate(request, username=user.email, password="25256789")
    login(request, user)
    user = request.user

    # fix Object of type User is not JSON serializable
    user = {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": user.is_active,
        "is_student": user.is_student,
        "is_teacher": user.is_teacher,
        "is_entrant": user.is_entrant,
        "is_superuser": user.is_superuser,
        "is_staff": user.is_staff
    }

    return JsonResponse(user, safe=False)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-authentication/", include("rest_framework.urls")),
    path('api/auth/', include('authentication.urls')),
    path("", include("drfpasswordless.urls")),
    # wagtail cms
    path(r"api/", include(grapple_urls)),
    path("api/v2/", apiRouter.urls),
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path('login/', loginAuth),
    path("", include(wagtail_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
