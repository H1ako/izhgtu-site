from django.contrib.auth import logout
from django.http import HttpResponseRedirect, JsonResponse


def back(request):
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def logout_and_back(request):
    logout(request)

    return JsonResponse({'status': 'ok'})
