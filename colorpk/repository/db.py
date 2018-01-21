from colorpk.models.db import Color, UserLike, User
from datetime import timezone, datetime

def getAllColor():
    return list(map(lambda x: x.to_dict(), Color.objects.all()))

def createNewColor(color, user):
    newColorParams = {
        'like': 0,
        'color': color,
        'display': 1,
        'createdate': datetime.now(timezone.utc)
    }
    if user:
        newColorParams['userid'] = user['id']
        newColorParams['username'] = user['name']

    newColor = Color(**newColorParams)
    newColor.save()