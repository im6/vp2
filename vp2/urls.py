from django.urls import path, re_path
from colorpk import views
from colorpk import controller

urlpatterns = [
    path('', views.index),
    path('color/<int:id>', views.colorOne),
    path('latest', views.latest),
    path('newcolor', views.newcolor),
    path('signin', views.signin),
    path('profile', views.profile),
    path('auth/<str:src>', views.auth),

    path('like/<int:id>', controller.toggleLike),
    path('create', controller.createColor),
    path('userDetail', controller.getUser),

    re_path(r'/*', views.notfound),
]