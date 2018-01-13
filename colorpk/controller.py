from django.http import HttpResponse,JsonResponse
import json
import colorpk.cache_storage as cache
from colorpk.models.auth import getUrl
import uuid

def toggleLike(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    cache.like(id)
    return JsonResponse({
        "color": id
    })

def createColor(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    return JsonResponse({
        "error": False
    })

def getUser(request):
    return JsonResponse({
        "user": request.session.get('user', None)
    })

def generateUrl(request):
    state = str(uuid.uuid4())
    request.session['state'] = state
    return JsonResponse({
        "wb": getUrl('wb', state),
        "fb": getUrl('fb', state),
        "gg": getUrl('gg', state),
    })