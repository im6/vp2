from django.http import HttpResponse
from django.views.generic import TemplateView
from django.template import Context, Template
from django.template.loader import get_template, render_to_string

def index(request):
    template = get_template('main.html')
    return HttpResponse(template.render({"my_name": "Adrian"}))

def colorOne(request, id):
    return HttpResponse("Hello, world. number : %s."%id)

def latest(request):
    return HttpResponse("Hello, world. latest view.")

def about(request):
    return HttpResponse(get_template('about.html').render())