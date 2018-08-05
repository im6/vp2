from django.test import TestCase
from colorpk.models.db import Color
from datetime import datetime, timezone
from math import floor
from random import random

class ModelTestCase(TestCase):
    def setUp(self):
        self.createColors()

    def test_case_1(self):
        self.assertEqual(1 + 1, 2)

    def createColors(self):
        print("create colors...")
        dummyColor0 = Color(
            like=10,
            color="FBF7F7#F1E9E3#EE712B#DC4712",
            display=1,
            createdate=datetime.now(timezone.utc)
        )
        dummyColor0.save()

        dummyColor1 = Color(
            like=11,
            color="FCEFEE#FCCDE2#FC5C9C#C5E3F6",
            display=1,
            createdate=datetime.now(timezone.utc)
        )
        dummyColor1.save()

        dummyColor2 = Color(
            like=12,
            color="7BC74D#474747#6e6e6e#EEEEEE",
            display=1,
            createdate=datetime.now(timezone.utc)
        )
        dummyColor2.save()
