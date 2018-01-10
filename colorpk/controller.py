from django.http import HttpResponse,JsonResponse
import json

def toggleLike(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
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