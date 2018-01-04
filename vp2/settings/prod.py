from .base import *

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = ['localhost']
STATIC_URL = '//dkny.oss-cn-hangzhou.aliyuncs.com/2/'