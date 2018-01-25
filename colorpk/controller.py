from django.http import JsonResponse
import json
import colorpk.repository.cache as cache
from colorpk.repository.db import createNewColor, createUserLike, deleteUserLike, getUserLike

def toggleLike(request, id):
    if request.method == 'POST':
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        cache.like(id)
        user = request.session.get('user', None)

        likes = request.session.get('likes', [])
        likes.append(id)
        request.session['likes'] = likes

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
    result = createNewColor('#'.join(body['color']), user)

    return JsonResponse({
        "error": result
    })