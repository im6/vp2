import os
from django.core.wsgi import get_wsgi_application
from django.apps import AppConfig

#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vp2.settings')

application = get_wsgi_application()
