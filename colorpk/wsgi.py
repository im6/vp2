"""
WSGI config for colorpk project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from django.apps import AppConfig

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "colorpk.settings")

application = get_wsgi_application()

class ColorPkConfig(AppConfig):
    name = 'colorpk'
    verbose_name = "ColorPK Web"
