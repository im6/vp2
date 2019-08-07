import os
import sys
import uuid

from django.shortcuts import redirect
from django.middleware.csrf import get_token
from django.template.loader import get_template
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpRequest, HttpResponse, HttpResponseNotFound

import colorpk.repository.cache as cache
from colorpk.models.auth import getUrl
from colorpk.shared import colorpk_admin_auth
from colorpk.repository.db import getUserLike, getUnpublishedColors
from colorpk.models.auth import OAuth2Facebook, OAuth2Weibo, OAuth2Google, OAuth2Github  # needed here

ASSETVERSION = os.getenv('VERSION', 'debug')

template_main = get_template('main.html')
template_one_color = get_template('one_color.html')
template_error = get_template('error.html')
template_create = get_template('create.html')
template_admin = get_template('admin.html')
template_signin = get_template('signin.html')
template_profile = get_template('profile.html')
template_about = get_template('about.html')


def popular(request: HttpRequest) -> HttpResponse:
    alldata = cache.getColors()
    alldata1 = sorted(alldata, key=lambda v: v['like'], reverse=True)
    like_list = request.session.get('likes', [])
    user = request.session.get('user', None)
    return HttpResponse(template_main.render({
        'path': request.path,
        'assetName': 'bundle0',
        'version': ASSETVERSION,
        'list': alldata1,
        'user': user,
        'likes': like_list,
        'csrf_token': get_token(request),
    }))


def latest(request: HttpRequest) -> HttpResponse:
    alldata = cache.getColors()
    like_list = request.session.get('likes', [])
    user = request.session.get('user', None)
    return HttpResponse(template_main.render({
        'path': request.path,
        'assetName': 'bundle0',
        'version': ASSETVERSION,
        'list': alldata,
        'user': user,
        'likes': like_list,
        'csrf_token': get_token(request),
    }))


def color_one(request: HttpRequest, id: int) -> HttpResponse:
    one_color = cache.getColor(id)
    if one_color:
        return HttpResponse(template_one_color.render({
            'path': request.path,
            'assetName': 'bundle3',
            'version': ASSETVERSION,
            'user': request.session.get('user', None),
            'likes': request.session.get('likes', []),
            'oneColor': {
                'id': id,
                'color': one_color.get('color'),
                'like': one_color.get('like'),
                'username': one_color.get('username') if one_color.get('username') else 'Anonymous',
                'createdate': one_color.get('createdate'),
            },
            'csrf_token': get_token(request),
        }))
    else:
        return HttpResponseNotFound(template_error.render({
            'code': 404,
            'msg': 'Color Not Found!'
        }))


def new_color(request: HttpRequest) -> HttpResponse:
    defaultValue = request.GET.get('c', '')
    return HttpResponse(template_create.render({
        'path': request.path,
        'assetName': 'bundle2',
        'version': ASSETVERSION,
        'user': request.session.get('user', None),
        'defaultValue': defaultValue,
        'csrf_token': get_token(request),
    }))


@colorpk_admin_auth('view')
def admin(request: HttpRequest) -> HttpResponse:
    invisibleColor = getUnpublishedColors()
    return HttpResponse(template_admin.render({
        'path': request.path,
        'assetName': 'bundle5',
        'version': ASSETVERSION,
        'user': request.session.get('user', None),
        'list': invisibleColor,
        'csrf_token': get_token(request),
    }))


def signin(request: HttpRequest) -> HttpResponse:
    state = str(uuid.uuid4())
    request.session['state'] = state
    if 'user' in request.session:
        del request.session['user']
    if 'likes' in request.session:
        del request.session['likes']
    return HttpResponse(template_signin.render({
        'path': request.path,
        'assetName': 'bundle1',
        'version': ASSETVERSION,
        'wb': getUrl('wb', state),
        'fb': getUrl('fb', state),
        'gg': getUrl('gg', state),
        'gh': getUrl('gh', state),
    }))


@cache_page(60 * 60)
def notfound(request: HttpRequest) -> HttpResponse:
    return HttpResponseNotFound(template_error.render({
        'code': 404,
        'msg': 'Not Found!'
    }))


def profile(request: HttpRequest) -> HttpResponse:
    user = request.session.get('user', None)
    if user:
        visible_list = cache.getColors()
        invis_list = cache.getInvisibleColors()
        list0 = filter(lambda a: a.get('userid') ==
                       user.get('id'), invis_list + visible_list)
        list1_ids = getUserLike(user['id'])
        list1 = filter(lambda a: a.get('id') in list1_ids,
                       invis_list + visible_list)
        return HttpResponse(template_profile.render({
            'path': request.path,
            'assetName': 'bundle4',
            'version': ASSETVERSION,
            'list0': list0,
            'list1': list1,
            'user': request.session.get('user', None),
            'csrf_token': get_token(request),
        }))
    else:
        return HttpResponse(template_error.render({
            'code': 401,
            'msg': 'Unauthorized!'
        }))


def auth(request: HttpRequest, src: str) -> HttpResponse:
    if request.session.get('state', None) == request.GET['state']:
        del request.session['state']
        name_map = {
            'gg': 'Google',
            'fb': 'Facebook',
            'gh': 'Github',
            'wb': 'Weibo'
        }
        auth = getattr(sys.modules[__name__],
                       'OAuth2%s' % name_map.get(src))()
        token = auth.getToken(request.GET['code'])
        if token:
            userInfo = auth.getUserInfo(token)
            userJSON = auth.registerUser(userInfo)
            request.session['user'] = userJSON
            request.session['likes'] = getUserLike(userJSON.get('id'))
            return redirect('/')
        else:
            return HttpResponse(template_signin.render({
                'path': request.path,
                'assetName': 'bundle1',
                'version': ASSETVERSION,
                'error': 'Authentication Failed.'
            }))
    else:
        return HttpResponse(template_signin.render({
            'path': request.path,
            'assetName': 'bundle1',
            'version': ASSETVERSION,
            'error': 'No valid state found.'
        }))


def about(request: HttpRequest) -> HttpResponse:
    return HttpResponse(template_about.render())
