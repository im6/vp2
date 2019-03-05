import os

BASE_DIR = os.path.dirname(os.path.abspath(os.path.join(__file__, '../..')))
WSGI_APPLICATION = 'vp2.wsgi.application'
ROOT_URLCONF = 'vp2.urls'

USE_I18N = False
USE_L10N = True
LANGUAGE_CODE = 'en-us'

USE_TZ = True
TIME_ZONE = 'UTC'

CSRF_USE_SESSIONS = False
CSRF_COOKIE_HTTPONLY = True
SESSION_ENGINE='django.contrib.sessions.backends.signed_cookies'
APPEND_SLASH = False

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
        'TIMEOUT': None,
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
            'read_default_file': 'local/connection.cnf',
        },
    }
}