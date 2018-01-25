from colorpk.models.db import Color, UserLike, User
from datetime import timezone, datetime
import math
from random import random
from django.db import Error

def getAllColor():
    return list(map(lambda x: x.to_dict(), Color.objects.all()))

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

def getUserLikeColors(userId):
    list_like0 = UserLike.objects.filter(user=userId)
    list_like1 = list(map(lambda x: x.to_dict(), list_like0))
    color_list0 = list(map(lambda x: x['color'], list_like1))
    color_list1 = Color.objects.filter(id__in = color_list0)
    color_list2 = list(map(lambda x: x.to_dict(), color_list1))
    return color_list2

def createUserLike(colorId, userId):
    ul = UserLike(color_id=colorId, user_id=userId)
    ul.save()

def deleteUserLike(colorId, userId):
    ul = UserLike.objects.get(color_id=colorId, user_id=userId)
    ul.delete()

def getUserLike(userId):
    list_like0 = UserLike.objects.filter(user_id = userId)
    list_like1 = list(map(lambda x: x.to_dict()['color'], list_like0))
    return list_like1