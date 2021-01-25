from django import utils
from django.db import models

class Color(models.Model):
    id = models.AutoField(primary_key=True)
    star = models.IntegerField()
    color = models.CharField(max_length=27, unique=True)
    user_id = models.IntegerField(null=True, db_column='user_id')
    username = models.CharField(max_length=40, null=True)
    color_type = models.CharField(max_length=50, null=True, db_column='color_type')
    display = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=utils.timezone.now, db_column='created_date')

class User(models.Model):
    id = models.AutoField(primary_key=True)
    oauth = models.SlugField(max_length=2)
    name = models.CharField(max_length=50)
    oauth_id = models.CharField(max_length=30, db_column='oauth_id')
    is_admin = models.BooleanField(default=False, db_column='is_admin')
    last_login = models.DateTimeField(default=utils.timezone.now, db_column='last_login')

class UserLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'color'),)
