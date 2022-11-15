from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

# wagtail cms
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from .api import apiRouter


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-authentication/', include('rest_framework.urls')),
    path('', include('drfpasswordless.urls')),
    # wagtail cms
    path('api/v2/', apiRouter.urls),
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('', include(wagtail_urls)),
]

# for receiving data from user
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)

# for router
# urlpatterns.append(
    # re_path(r'^(?!api/*).*', TemplateView.as_view(template_name="index.html")))