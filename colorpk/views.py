from django.http import HttpResponse
from django.views.generic import TemplateView
from django.template import Context, Template
from django.template.loader import get_template, render_to_string
from .models import db
from datetime import datetime
import json
import uuid
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.views.decorators.cache import cache_page
from colorpk.models.auth import getUrl, config
from colorpk.models.auth import OAuth2_fb, OAuth2_wb, OAuth2_gg
import colorpk.cache_storage as cache
import sys

@ensure_csrf_cookie
def index(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    return HttpResponse(template.render({
        "list": alldata,
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
    template = get_template('profile.html')
    alldata = cache.getColors()
    for key, value in enumerate(alldata):
        value["canvas"] = value["color"].split("#")
        value["canvas"] = list(map(lambda x: "#%s" % x, value["canvas"]))

    return HttpResponse(template.render({
        "path": request.path,
        "list0": alldata[0: 10],
        "list1": alldata[10: 20],
    }))

def signin(request):
    state = str(uuid.uuid4())
    request.session['state'] =  state
    return render_to_response('signin.html', {
        "path": request.path,
        "wb": getUrl('wb', state),
        "fb": getUrl('fb', state),
        "gg": getUrl('gg', state),
    })

def latest(request):
    template = get_template('main.html')
    alldata = cache.getColors()
    for key, value in enumerate(alldata):
        value["canvas"] = value["color"].split("#")
        value["canvas"] = list(map(lambda x: "#%s" % x, value["canvas"]))
    return HttpResponse(template.render({
        "list": alldata,
        "path": request.path
    }))

@cache_page(60 * 60)
def notfound(request):
    # return redirect('/404found')
    return render_to_response('error_404.html')

def auth(request, src):
    if request.session.get('state', None) == request.GET['state']:
        auth = getattr(sys.modules[__name__], "OAuth2_%s"%src)()
        token = auth.getToken(request.GET['code'])
        if token:
            userInfo = auth.getUserInfo(token)
            request.session['user'] = userInfo
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

