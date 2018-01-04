"""
WSGI config for vp2 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from django.apps import AppConfig

#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vp2.settings.dev")
print(os.environ.get('DJANGO_SETTINGS_MODULE'))

application = get_wsgi_application()
