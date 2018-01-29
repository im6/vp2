from django.forms.models import model_to_dict
from colorpk.models.db import Color, UserLike, User
from datetime import timezone, datetime
import math
import logging
from random import random

def getAllColor():
    all_color = Color.objects.all()
    return list(map(lambda x: model_to_dict(x), all_color))

def createNewColor(color, user):
    newColorParams = {
        'like': math.floor(random() * 30),
        'color': color,
        'display': 1,
        'createdate': datetime.now(timezone.utc)
    }
    if user:
        newColorParams['userid'] = user['id']
        newColorParams['username'] = user['name']

    error = False
    try:
        newColor = Color(**newColorParams)
        newColor.save()
    except:
        error = True

    return error

def createUserLike(colorId, userId):
    try:
        ul = UserLike(color_id=colorId, user_id=userId)
        ul.save()
        return False
    except:
        logging.error('Try to add duplicate to the userlike')
        return True


def deleteUserLike(colorId, userId):
    try:
        ul = UserLike.objects.get(color_id=colorId, user_id=userId)
        ul.delete()
        return False
    except:
        logging.error('Try to delete records not exist on userlike table.')
        return True

def getUserLike(userId):
    list_like0 = UserLike.objects.filter(user_id = userId)
    list_like1 = list(map(lambda x: model_to_dict(x)['color'], list_like0))
    return list_like1

def checkAdmin(userId):
    result = User.objects.filter(id=userId, isadmin=True).exists()
    return result

def getUnpublishedColors():
    result0 = Color.objects.filter(display=True)
    result1 = list(map(lambda x: model_to_dict(x), result0))
    for one in result1:
        cls = one['color'].split('#')
        one['color'] = list(map(lambda x : '#%s'%x, cls))
    return result1

def approveColor(id):
    thisColor = Color.objects.get(id=id)
    thisColor.display = False
    thisColor.save()
    return False

def deleteColor(id):
    thisColor = Color.objects.get(id=id)
    thisColor.delete()
    return False

