from django.test import TestCase, Client
from colorpk.models.db import Color

class HttpTestCase(TestCase):
    def setUp(self):
        print("set up test http case")

    def post_method(self):
        c = Client()
        res = c.post('/create/', {'username': 'john', 'password': 'smith'})
        print(res.status_code)

    def get_method(self):
        c = Client()
        res = c.get('/signin')
        print(res.status_code)