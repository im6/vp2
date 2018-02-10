from .base import *

INSTALLED_APPS = [
    'colorpk',
    'django.contrib.sessions',
]

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = ['.colorpk.com']
STATIC_URL = '//dkny.oss-cn-hangzhou.aliyuncs.com/4/'

COLORPK_VERSION = 'a1'