from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.views.decorators.cache import cache_page
from colorpk.models.auth import OAuth2_fb, OAuth2_wb, OAuth2_gg, OAuth2_gh
import colorpk.repository.cache as cache
from colorpk.repository.db import getUserLike, checkAdmin, getUnpublishedColors
import colorpk.repository.sessionManager as sm
from colorpk.models.auth import getUrl
from colorpk.shared import colorpk_auth, colorpk_admin_auth
import sys
import logging
import uuid

@ensure_csrf_cookie
def popular(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    alldata1 = sorted(alldata, key=lambda v: v['like'], reverse=True)
    likeList = sm.getLikeList(request.session)
    return HttpResponse(template.render({
        "list": alldata1,
        "path": request.path,
        "user": request.session.get('user', None),
        "likes": likeList
    }))

@ensure_csrf_cookie
def latest(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    likeList = sm.getLikeList(request.session)
    return HttpResponse(template.render({
        "list": alldata,
        "path": request.path,
        "user": request.session.get('user', None),
        "likes": likeList
    }))


@ensure_csrf_cookie
def colorOne(request, id):
    oneColor = cache.getColor(id)
    if oneColor:
        return render_to_response('one_color.html', {
            "path": request.path,
            "user": request.session.get('user', None),
            "oneColor": {
                "id": id,
                "color": oneColor.get('color'),
                "like": oneColor.get('like'),
                "username": oneColor.get('username') if oneColor.get('username') else 'Anonymous',
                "createdate": oneColor.get('createdate'),
            }
        })
    else:
        return render_to_response('error.html', {
            "code": 404,
            "msg": "Color Not Found!"
        })

def newcolor(request):
    return render_to_response('create.html', {
        "path": request.path,
        "user": request.session.get('user', None)
    })

@colorpk_admin_auth('view')
def admin(request):
    invisibleColor = getUnpublishedColors()
    return render_to_response('admin.html', {
        "path": request.path,
        "user": request.session.get('user', None),
        "list": invisibleColor,
    })

def signin(request):
    state = str(uuid.uuid4())
    request.session['state'] = state
    request.session['user'] = None
    return render_to_response('signin.html', {
        "path": request.path,
        "wb": getUrl('wb', state),
        "fb": getUrl('fb', state),
        "gg": getUrl('gg', state),
        "gh": getUrl('gh', state),
    })

@cache_page(60 * 60)
def notfound(request):
    return render_to_response('error.html', {
        "code": 404,
        "msg": "Not Found!"
    })

@cache_page(60 * 60)
def unauth(request):
    return render_to_response('error.html', {
        "code": 401,
        "msg": "Unauthorized!"
    })

@colorpk_auth('view')
def profile(request):
    user = request.session.get('user', None)
    template = get_template('profile.html')
    visible_list = cache.getColors()
    invis_list = cache.getInvisibleColors()
    list0 = filter(lambda a : a.get('userid') == user.get('id'), invis_list + visible_list)
    list1_ids = getUserLike(user['id'])
    list1 = filter(lambda a : a.get('id') in list1_ids, invis_list + visible_list)
    return HttpResponse(template.render({
        "path": request.path,
        "list0": list0,
        "list1": list1,
        "user": request.session.get('user', None)
    }))

def auth(request, src):
    if request.session.get('state', None) == request.GET['state']:
        del request.session['state']
        auth = getattr(sys.modules[__name__], "OAuth2_%s"%src)()
        token = auth.getToken(request.GET['code'])
        if token:
            userInfo = auth.getUserInfo(token)
            userJSON = auth.registerUser(userInfo)
            request.session['user'] = userJSON
            request.session['likes'] = getUserLike(userJSON['id'])
            logging.debug(userJSON)
            return redirect('/')
        else:
            return render_to_response('signin.html', {
                "path": request.path,
                "error": "Authentication Failed."
            })
    else:
        return render_to_response('signin.html', {
            "path": request.path,
            "error": "No valid state found."
        })

