from django.urls import path, re_path
from colorpk import views
from colorpk import controller

urlpatterns = [
    path('', views.popular),
    path('color/<int:id>', views.colorOne),
    path('latest', views.latest),
    path('popular', views.popular),
    path('newcolor', views.newcolor),
    path('signin', views.signin),
    path('profile', views.profile),
    path('auth/<str:src>', views.auth),
    path('admin', views.admin),
    path('unauth', views.unauth),

    path('like/<int:id>', controller.toggleLike),
    path('create', controller.createColor),

    re_path(r'/*', views.notfound),
]