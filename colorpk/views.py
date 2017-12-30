from django.http import HttpResponse
from django.views.generic import TemplateView
from django.template import Context, Template
from django.template.loader import get_template, render_to_string
from .models import Color
from datetime import datetime
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render_to_response
from django.shortcuts import redirect
from django.views.decorators.cache import cache_page

#@cache_page(60 * 3)
@ensure_csrf_cookie
def index(request):
    template = get_template('main.html')
    alldata = list(map(lambda x: x.to_dict(), Color.objects.all()))
    for key, value in enumerate(alldata):
        value["canvas"] = value["color"].split("#")
        value["canvas"] = list(map(lambda x: "#%s"%x, value["canvas"]))
    return HttpResponse(template.render({
        "list": alldata,
    }))

def colorOne(request, id):
    return HttpResponse("Hello, world. number : %s."%id)

def latest(request):
    return HttpResponse("Hello, world. latest view.")

def about(request):
    return HttpResponse(get_template('about.html').render())

@cache_page(60 * 60)
def notfound(request):
    # return redirect('/404found')
    return render_to_response('error_404.html')
