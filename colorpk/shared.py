from django.shortcuts import render_to_response
from django.http import JsonResponse
from colorpk.repository.db import checkAdmin
import logging

def colorpk_auth(resType):
    def colorpk_auth_inner(function):
        def wrapper(*args, **kwargs):
            user = args[0].session.get('user', None)
            if user:
                return function(*args, **kwargs)
            else:
                if resType == 'view':
                    return render_to_response('error.html', {
                        "code": 401,
                        "msg": "Unauthorized!"
                    })
                elif resType == 'json':
                    return JsonResponse({
                        "error": True,
                        "code": 401,
                        "msg": "Unauthorized!"
                    })
        return wrapper
    return colorpk_auth_inner

def colorpk_admin_auth(resType):
    def colorpk_auth_inner(function):
        def wrapper(*args, **kwargs):
            user = args[0].session.get('user', None)
            if user and checkAdmin(user.get('id')):
                return function(*args, **kwargs)
            else:
                logging.error('user(id=%s) attempt for admin'%(user.get('id', None)))
                if resType == 'view':
                    return render_to_response('error.html', {
                        "code": 401,
                        "msg": "Unauthorized!"
                    })
                elif resType == 'json':
                    return JsonResponse({
                        "error": True,
                        "code": 401,
                        "msg": "Unauthorized!"
                    })

        return wrapper
    return colorpk_auth_inner