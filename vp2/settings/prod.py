import os
from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.sessions',
]

DEBUG = False
ALLOWED_HOSTS = ['.colorpk.com']
SECRET_KEY = os.environ.get('SECRET_KEY')
