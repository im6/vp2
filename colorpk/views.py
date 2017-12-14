from django.http import HttpResponse
from .models import Color

def index(request):
    allColors = Color.objects.all()
    print(allColors)
    return HttpResponse("Hello, world. You're at the polls index.")