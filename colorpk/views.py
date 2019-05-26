import os
import sys
import uuid

from django.http import HttpResponse
from django.shortcuts import redirect
from django.http import HttpResponseNotFound
from django.middleware.csrf import get_token
from django.template.loader import get_template
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import ensure_csrf_cookie

import colorpk.repository.cache as cache
from colorpk.models.auth import getUrl
from colorpk.shared import colorpk_admin_auth
from colorpk.repository.db import getUserLike, getUnpublishedColors
from colorpk.models.auth import OAuth2_fb, OAuth2_wb, OAuth2_gg, OAuth2_gh # needed here

ASSETVERSION = os.getenv('VERSION', 'debug')

template_main = get_template('main.html')
template_oneColor = get_template('one_color.html')
template_error = get_template('error.html')
template_create = get_template('create.html')
template_admin = get_template('admin.html')
template_signin = get_template('signin.html')
template_profile = get_template('profile.html')
template_about = get_template('about.html')

def popular(request):
    alldata = cache.getColors()
    alldata1 = sorted(alldata, key=lambda v: v['like'], reverse=True)
    likeList = request.session.get('likes', [])
    user = request.session.get('user', None)
    return HttpResponse(template_main.render({
        'path': request.path,
        'assetName': 'bundle0',
        'version': ASSETVERSION,
        'list': alldata1,
        'user': user,
        'likes': likeList,
        'csrf_token': get_token(request),
    }))

def latest(request):
    alldata = cache.getColors()
    likeList = request.session.get('likes', [])
    user = request.session.get('user', None)
    return HttpResponse(template_main.render({
        'path': request.path,
        'assetName': 'bundle0',
        'version': ASSETVERSION,
        'list': alldata,
        'user': user,
        'likes': likeList,
        'csrf_token': get_token(request),
    }))

def colorOne(request, id):
    oneColor = cache.getColor(id)
    if oneColor:
        return HttpResponse(template_oneColor.render({
            'path': request.path,
            'assetName': 'bundle3',
            'version': ASSETVERSION,
            'user': request.session.get('user', None),
            'oneColor': {
                'id': id,
                'color': oneColor.get('color'),
                'like': oneColor.get('like'),
                'username': oneColor.get('username') if oneColor.get('username') else 'Anonymous',
                'createdate': oneColor.get('createdate'),
            },
            'csrf_token': get_token(request),
        }))
    else:
        return HttpResponseNotFound(template_error.render({
            'code': 404,
            'msg': 'Color Not Found!'
        }))

def newcolor(request):
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
def admin(request):
    invisibleColor = getUnpublishedColors()
    return HttpResponse(template_admin.render({
        'path': request.path,
        'assetName': 'bundle5',
        'version': ASSETVERSION,
        'user': request.session.get('user', None),
        'list': invisibleColor,
        'csrf_token': get_token(request),
    }))

def signin(request):
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
def notfound(request):
    return HttpResponseNotFound(template_error.render({
        'code': 404,
        'msg': 'Not Found!'
    }))

def profile(request):
    user = request.session.get('user', None)
    if user:
        visible_list = cache.getColors()
        invis_list = cache.getInvisibleColors()
        list0 = filter(lambda a: a.get('userid') == user.get('id'), invis_list + visible_list)
        list1_ids = getUserLike(user['id'])
        list1 = filter(lambda a: a.get('id') in list1_ids, invis_list + visible_list)
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

def auth(request, src):
    if request.session.get('state', None) == request.GET['state']:
        del request.session['state']
        auth = getattr(sys.modules[__name__], 'OAuth2_%s'%src)()
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

def about(request):
  return HttpResponse(template_about.render())