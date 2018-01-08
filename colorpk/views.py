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
from colorpk.models.db import Color
from colorpk.models.auth import OAuth2_fb, OAuth2_wb, OAuth2_gg
import sys

#@cache_page(60 * 3)
@ensure_csrf_cookie
def index(request):
    template = get_template('main.html')
    alldata = list(map(lambda x: x.to_dict(), Color.objects.all()))
    for key, value in enumerate(alldata):
        value["canvas"] = value["color"].split("#")
        value["canvas"] = list(map(lambda x: "#%s"%x, value["canvas"]))

    if request.session.test_cookie_worked():
        print('cookie is working')
        request.session.delete_test_cookie()

    request.session.set_test_cookie()
    print('cookie set')

    return HttpResponse(template.render({
        "list": alldata,
        "path": request.path
    }))

@cache_page(60 * 60 * 60)
def colorOne(request, id):
    oneColor = Color.objects.get(id=id)
    return render_to_response('one_color.html', {
        "path": request.path,
        "id": id,
        "value": oneColor.color
    })

def newcolor(request):
    return render_to_response('create.html', {
        "path": request.path
    })

def signin(request):
    state = str(uuid.uuid4())
    request.session['state'] =  state
    return render_to_response('signin.html', {
        "path": request.path,
        "wb": getUrl('wb', state),
        "fb": getUrl('fb', state),
        "gg": getUrl('gg', state),
    })

@cache_page(60 * 3)
def latest(request):
    template = get_template('main.html')
    alldata = list(map(lambda x: x.to_dict(), Color.objects.all().order_by('-id')))
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
    if 'state' in request.session and request.session['state'] == request.GET['state']:
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

