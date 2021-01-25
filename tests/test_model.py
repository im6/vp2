from django.test import TestCase
from colorpk.models.db import Color
from datetime import datetime, timezone
from colorpk.repository.db import get_all_color

class ModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.colorList = [
            Color.objects.create(
                star=10,
                color="FBF7F7#F1E9E3#EE712B#DC4712",
                display=1,
                created_date=datetime.now(timezone.utc)
            ),
            Color.objects.create(
                star=11,
                color="FCEFEE#FCCDE2#FC5C9C#C5E3F6",
                display=1,
                created_date=datetime.now(timezone.utc)
            ),
            Color.objects.create(
                star=12,
                color="7BC74D#474747#6e6e6e#EEEEEE",
                display=1,
                created_date=datetime.now(timezone.utc)
            )
        ]
    def test_color_exist(self):
        self.assertEqual(len(self.colorList), 3)

        

        

        
