from django.db import models

class Color(models.Model):
    id = models.IntegerField(primary_key=True)
    like = models.IntegerField()
    color = models.CharField(max_length=27)
    userid = models.IntegerField(null=True)
    username = models.CharField(max_length=40, null=True)
    colortype = models.CharField(max_length=50, null=True)
    display = models.BooleanField()
    createdate = models.DateTimeField()

    def to_dict(self):
        return {
            "id": self.id,
            "like": self.like,
            "color": self.color,
            "userid": self.userid,
            "username": self.username,
            "colortype": self.colortype,
            "display": self.display,
            "createdate": self.createdate,
        }