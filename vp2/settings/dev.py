from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.staticfiles',
    'django.contrib.sessions',
    #'django.contrib.admin',
    #'django.contrib.auth',
    #'django.contrib.contenttypes',
    #'django.contrib.messages',
]

SECRET_KEY = 'hello,world'
DEBUG = True
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]