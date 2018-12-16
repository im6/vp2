import json
from django.template.loader import get_template
from django.http import HttpResponseNotFound, JsonResponse
from colorpk.repository.db import createNewColor, createUserLike, deleteUserLike, approveColor, deleteColor
from colorpk.shared import colorpk_admin_auth
import colorpk.repository.cache as cache

@cache.colorpk_like_buffer
def toggleLike(request, id):
    if request.method == 'POST':
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        cache.like(id)
        user = request.session.get('user', None)
        if user:
            createUserLike(id, user['id'])
        return JsonResponse({
            "error": False
        })
    elif request.method == 'DELETE':
        user = request.session.get('user', None)
        result = False
        if user:
            result = deleteUserLike(id, user['id'])
        return JsonResponse({
            "error": result
        })
    else:
        template = get_template("error.html")
        return HttpResponseNotFound(template.render({
            "code": 404,
            "msg": "Not Found!"
        }))

def createColor(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = request.session.get('user', None)

        colorValue = '#'.join(body['color'])
        if len(colorValue) == 27:
            result = createNewColor(colorValue, user)
            return JsonResponse({
                "error": result
            })
        else:
            return JsonResponse({
                "error": "color value size illegal"
            })
    else:
        template = get_template("error.html")
        return HttpResponseNotFound(template.render({
            "code": 404,
            "msg": "Not Found!"
        }))

@colorpk_admin_auth('json')
def approve(request, id):
    if request.method == 'POST':
        result = approveColor(id)
        return JsonResponse({
            "error": result
        })
    elif request.method == 'DELETE':
        result = deleteColor(id)
        return JsonResponse({
            "error": result
        })
    else:
        template = get_template("error.html")
        return HttpResponseNotFound(template.render({
            "code": 404,
            "msg": "Not Found!"
        }))

@colorpk_admin_auth('json')
def syncCache(request):
    cacheData = cache.getCachedLikes()
    result = cache.syncAndRefresh()
    return JsonResponse({
        "error": result,
        "data": cacheData
    })
