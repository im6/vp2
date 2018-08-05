from django.test import TestCase, Client

class HttpTestCase(TestCase):
    def setUp(self):
        print("set up test http case")

    def test_signin(self):
        c = Client()
        res = c.get('/signin')
        self.assertTrue(res.status_code == 200)

    def test_main(self):
        c = Client()
        res = c.get('/')
        self.assertTrue(res.status_code == 200)