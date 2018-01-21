from django.urls import path, re_path
from colorpk import views
from colorpk import controller

urlpatterns = [
    path('', views.index),
    path('color/<int:id>', views.colorOne),
    path('latest', views.latest),
    path('popular', views.popular),
    path('newcolor', views.newcolor),
    path('signin', views.signin),
    path('profile', views.profile),
    path('auth/<str:src>', views.auth),
    path('unauth', views.unauth),

    path('like/<int:id>', controller.toggleLike),
    path('create', controller.createColor),
    path('userDetail', controller.getUser),
    path('url', controller.generateUrl),

    re_path(r'/*', views.notfound),
]