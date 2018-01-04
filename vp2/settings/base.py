import os

BASE_DIR = os.path.dirname(os.path.abspath(os.path.join(__file__, "../..")))
WSGI_APPLICATION = 'vp2.wsgi.application'
ROOT_URLCONF = 'vp2.urls'
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'colorpk',
    'django.contrib.staticfiles',
    'django.contrib.sessions',
    #'django.contrib.admin',
    #'django.contrib.auth',
    #'django.contrib.contenttypes',
    #'django.contrib.messages',
]
MIDDLEWARE = [
    #'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    #'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            'colorpk/templates'
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'read_default_file': 'local/my.cnf',
        },
    }
}


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
CSRF_USE_SESSIONS = False
APPEND_SLASH = False
