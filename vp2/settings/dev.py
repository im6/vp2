from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.staticfiles',
    'django.contrib.sessions',
]

DEBUG = True
ALLOWED_HOSTS = []
SECRET_KEY = 'helloWorld'
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]