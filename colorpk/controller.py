import json
from django.http import JsonResponse, HttpRequest, HttpResponse
from django.views.decorators.http import require_http_methods
from colorpk.repository.db import createNewColor, createUserLike, deleteUserLike, approveColor, deleteColor
from colorpk.shared import colorpk_admin_auth
import colorpk.repository.cache as cache


@require_http_methods(['POST', 'DELETE'])
@cache.colorpk_like_buffer
def toggle_like(request: HttpRequest, id: int) -> HttpResponse:
    if request.method == 'POST':
        cache.like(id)
        user = request.session.get('user', None)
        result = False
        if user:
            result = createUserLike(id, user.get('id'))
            current_like = request.session['likes']
            current_like.append(id)
            request.session['likes'] = current_like
        return JsonResponse({
            'error': result
        })
    elif request.method == 'DELETE':
        user = request.session.get('user', None)
        result = False
        if user:
            result = deleteUserLike(id, user.get('id'))
            current_like = request.session['likes']
            request.session['likes'] = list(
                filter(lambda x: x != id, current_like))
        return JsonResponse({
            'error': result
        })


@require_http_methods(['POST'])
def create_color(request: HttpRequest) -> HttpResponse:
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = request.session.get('user', None)

    color_value = '#'.join(body.get('color'))
    if len(color_value) == 27:
        result = createNewColor(color_value, user)
        return JsonResponse({
            'error': result
        })
    else:
        return JsonResponse({
            'error': 'color value size illegal'
        })


@require_http_methods(['POST', 'DELETE'])
@colorpk_admin_auth('json')
def approve(request: HttpRequest, id: int) -> HttpResponse:
    if request.method == 'POST':
        result = approveColor(id)
        return JsonResponse({
            'error': result
        })
    elif request.method == 'DELETE':
        result = deleteColor(id)
        return JsonResponse({
            'error': result
        })


@require_http_methods(['POST'])
@colorpk_admin_auth('json')
def sync_cache(request: HttpRequest) -> HttpResponse:
    cache_data = cache.getCachedLikes()
    result = cache.syncAndRefresh()
    return JsonResponse({
        'error': result,
        'data': cache_data
    })
