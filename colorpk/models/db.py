from django.db import models
from django import utils

class Color(models.Model):
    id = models.AutoField(primary_key=True)
    like = models.IntegerField()
    color = models.CharField(max_length=27, unique=True)
    userid = models.IntegerField(null=True)
    username = models.CharField(max_length=40, null=True)
    colortype = models.CharField(max_length=50, null=True)
    display = models.BooleanField(default=True)
    createdate = models.DateTimeField(default=utils.timezone.now)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    oauth = models.SlugField(max_length=2)
    name = models.CharField(max_length=50)
    oauthid = models.CharField(max_length=30)
    isadmin = models.BooleanField(default=False)
    lastlogin = models.DateTimeField(default=utils.timezone.now)

class UserLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'color'),)

