from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
# wagtail cms
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from .api import apiRouter
from grapple import urls as grapple_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-authentication/", include("rest_framework.urls")),
    path("", include("drfpasswordless.urls")),
    # wagtail cms
    path(r"api/", include(grapple_urls)),
    path("api/v2/", apiRouter.urls),
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("", include(wagtail_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
