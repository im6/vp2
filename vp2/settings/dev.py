from .base import *

SECRET_KEY = 'hello,world'
DEBUG = True
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]