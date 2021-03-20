from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.sessions',
]

DEBUG = True
ALLOWED_HOSTS = [
  'localhost',
  '192.168.1.249'
]
SECRET_KEY = 'helloWorld'
if os.environ.get('HOT') == 'True':
    STATIC_URL = '/hot/'
