from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.sessions',
]

DEBUG = True
ALLOWED_HOSTS = []
SECRET_KEY = 'helloWorld'
if os.environ.get('HOT') == 'True':
    STATIC_URL = '/hot/'
