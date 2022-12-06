from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

# wagtail cms
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from .api import apiRouter
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-authentication/", include("rest_framework.urls")),
    path("", include("drfpasswordless.urls")),
    # wagtail cms
    url(r"^api/graphql", csrf_exempt(GraphQLView.as_view())),
    url(r"^api/graphiql", csrf_exempt(GraphQLView.as_view(graphiql=True, pretty=True))),
    path("api/v2/", apiRouter.urls),
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("", include(wagtail_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
