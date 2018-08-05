from django.test import TestCase
from colorpk.models.db import Color
from datetime import datetime, timezone
from colorpk.repository.db import getAllColor

class ModelTestCase(TestCase):
    def setUp(self):
        self.colorList = getAllColor()
        if len(self.colorList) < 1:
            print("color list empty.")
            self.createDummyColors()
            self.colorList = getAllColor()

    def test_color_exist(self):
        self.assertTrue(len(self.colorList) == 3)

    def createDummyColors(self):
        print("create colors...")
        Color.objects.create(
            like=10,
            color="FBF7F7#F1E9E3#EE712B#DC4712",
            display=1,
            createdate=datetime.now(timezone.utc)
        )

        Color.objects.create(
            like=11,
            color="FCEFEE#FCCDE2#FC5C9C#C5E3F6",
            display=1,
            createdate=datetime.now(timezone.utc)
        )

        Color.objects.create(
            like=12,
            color="7BC74D#474747#6e6e6e#EEEEEE",
            display=1,
            createdate=datetime.now(timezone.utc)
        )
