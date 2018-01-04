from .base import *

SECRET_KEY = 'xe76((ckz%fujq0e-6u!w^8+vqi9(5dm)5j$rfaex+qq*_fj6+'
DEBUG = True
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]