from django.urls import path, re_path
from colorpk import views
from colorpk import controller

urlpatterns = [
    path('', views.index),
    path('color/<int:id>', views.colorOne),
    path('like/<int:id>', controller.toggleLike),
    path('create', controller.createColor),
    path('latest', views.latest),
    path('newcolor', views.newcolor),
    path('signin', views.signin),
    re_path(r'/*', views.notfound),
]