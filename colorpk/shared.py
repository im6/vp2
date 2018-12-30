import logging
from django.template.loader import get_template
from django.http import JsonResponse, HttpResponse
from colorpk.repository.db import checkAdmin

def colorpk_admin_auth(resType):
    def colorpk_auth_inner(function):
        def wrapper(*args, **kwargs):
            user = args[0].session.get('user', None)
            if user and checkAdmin(user.get('id')):
                return function(*args, **kwargs)
            else:
                if user:
                    logging.error('user(id=%s) attempt for admin'%(user.get('id', None)))
                if resType == 'view':
                    template_error = get_template('error.html')
                    return HttpResponse(template_error.render({
                        'code': 401,
                        'msg': 'Unauthorized!'
                    }))
                elif resType == 'json':
                    return JsonResponse({
                        'error': True,
                        'code': 401,
                        'msg': 'Unauthorized!'
                    })

        return wrapper
    return colorpk_auth_inner