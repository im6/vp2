from django.http import HttpResponse
from django.template.loader import get_template, render_to_string
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.views.decorators.cache import cache_page
from colorpk.models.auth import OAuth2_fb, OAuth2_wb, OAuth2_gg, OAuth2_gh
import colorpk.repository.cache as cache
from colorpk.repository.db import getUserLikeColors
import sys

@ensure_csrf_cookie
def index(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    return HttpResponse(template.render({
        "list": alldata,
        "path": request.path
    }))

def latest(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    return HttpResponse(template.render({
        "list": alldata,
        "path": request.path
    }))

def popular(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    alldata1 = sorted(alldata, key=lambda v: v['like'], reverse=True)
    return HttpResponse(template.render({
        "list": alldata1,
        "path": request.path
    }))

@cache_page(60 * 60 * 60)
def colorOne(request, id):
    oneColor = cache.getColor(id)
    return render_to_response('one_color.html', {
        "path": request.path,
        "id": id,
        "value": oneColor.get('color')
    })

def newcolor(request):
    return render_to_response('create.html', {
        "path": request.path
    })

def profile(request):
    user = request.session.get('user', None)
    if not user:
        return redirect('/unauth')

    template = get_template('profile.html')
    visible_list = cache.getColors()
    invis_list = cache.getInvisibleColors()

    list0 = filter(lambda a : a.get('userid') == user.get('id'), invis_list + visible_list)
    list1 = getUserLikeColors(user)

    return HttpResponse(template.render({
        "path": request.path,
        "list0": list0,
        "list1": list1,
    }))

def signin(request):
    return render_to_response('signin.html', {
        "path": request.path,
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

def auth(request, src):
    if request.session.get('state', None) == request.GET['state']:
        auth = getattr(sys.modules[__name__], "OAuth2_%s"%src)()
        token = auth.getToken(request.GET['code'])
        if token:
            userInfo = auth.getUserInfo(token)
            userJSON = auth.registerUser(userInfo)
            request.session['user'] = userJSON
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

