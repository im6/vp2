from django.db import models

class Color(models.Model):
    id = models.IntegerField()
    like = models.IntegerField()
    color = models.CharField(max_length=27)
    userid = models.IntegerField()
    username = models.CharField(max_length=40)
    colortype = models.CharField(max_length=50)
    display = models.BooleanField()
    createdate = models.DateField()