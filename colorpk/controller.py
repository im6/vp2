from django.http import JsonResponse
import json
import colorpk.repository.cache as cache
from colorpk.repository.db import createNewColor, createUserLike, deleteUserLike, getUserLike
from colorpk.models.auth import getUrl
import uuid

def toggleLike(request, id):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        cache.like(id)
        user = request.session.get('user', None)
        if user:
            createUserLike(id, user['id'])
        return JsonResponse({
            "color": id
        })
    elif request.method == 'DELETE':
        user = request.session.get('user', None)
        if user:
            deleteUserLike(id, user['id'])
        return JsonResponse({
            "error": False
        })

def createColor(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = request.session.get('user', None)
    createNewColor('#'.join(body['color']), user)

    return JsonResponse({
        "error": False
    })

def getUser(request):
    user = request.session.get('user', None)
    like = []
    if user:
        like = getUserLike(user['id'])
    return JsonResponse({
        "user": user,
        "like": like
    })

def generateUrl(request):
    # request.session.flush()  ## not sync db cleanup
    state = str(uuid.uuid4())
    request.session['state'] = state
    request.session['user'] = None
    return JsonResponse({
        "wb": getUrl('wb', state),
        "fb": getUrl('fb', state),
        "gg": getUrl('gg', state),
        "gh": getUrl('gh', state),
    })