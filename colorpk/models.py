from django.db import models

class Color(models.Model):
    id = models.IntegerField(primary_key=True)
    like = models.IntegerField()
    color = models.CharField(max_length=27)
    userid = models.IntegerField(null=True)
    username = models.CharField(max_length=40, null=True)
    colortype = models.CharField(max_length=50, null=True)
    display = models.BooleanField()
    createdate = models.DateField()