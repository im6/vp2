from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.sessions',
]

DEBUG = True
ALLOWED_HOSTS = []
SECRET_KEY = 'helloWorld'
# STATIC_URL = '/static/'
STATIC_URL = 'https://cdn.jsdelivr.net/gh/im6/vp2-ui@%s/dist/' % '0.0.1'
