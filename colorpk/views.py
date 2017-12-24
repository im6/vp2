from django.http import HttpResponse
from django.views.generic import TemplateView
from django.template import Context, Template
from django.template.loader import get_template, render_to_string
from .models import Color
from datetime import datetime

def index(request):
    template = get_template('main.html')
    joe = Color.objects.create(like=2,
                               color="F38181#FCE38A#EAFFD0#95E1D3",
                               display=1,
                               createdate=datetime.now()
                               )
    return HttpResponse(template.render({"my_name": "Adrian"}))

def colorOne(request, id):
    return HttpResponse("Hello, world. number : %s."%id)

def latest(request):
    return HttpResponse("Hello, world. latest view.")

def about(request):
    return HttpResponse(get_template('about.html').render())