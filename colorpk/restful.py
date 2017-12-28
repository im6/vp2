from django.http import HttpResponse
import json

def toggleLike(request, id):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    willLike = body['like']
    return HttpResponse("gonna like(%s) on id: %s" %(willLike, id))