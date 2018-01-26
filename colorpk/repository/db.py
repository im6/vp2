from django.forms.models import model_to_dict
from colorpk.models.db import Color, UserLike, User
from datetime import timezone, datetime
import math
import logging
from random import random
from django.db import Error
from django.core.exceptions import ObjectDoesNotExist

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
    except Error as e:
        error = True

    return error

def createUserLike(colorId, userId):
    ul = UserLike(color_id=colorId, user_id=userId)
    ul.save()

def deleteUserLike(colorId, userId):
    try:
        ul = UserLike.objects.get(color_id=colorId, user_id=userId)
        ul.delete()
        return False
    except ObjectDoesNotExist as e:
        logging.error('Try to delete records not exist on userlike table.')
        return True

def getUserLike(userId):
    list_like0 = UserLike.objects.filter(user_id = userId)
    list_like1 = list(map(lambda x: model_to_dict(x)['color'], list_like0))
    return list_like1