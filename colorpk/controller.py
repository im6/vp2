from django.http import HttpResponse
import json

def toggleLike(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return HttpResponse("gonna like on id: %s" %(id))

def createColor(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    return HttpResponse("hello create success")