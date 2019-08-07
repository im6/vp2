import math
import logging
from random import random
from datetime import timezone, datetime
from django.forms.models import model_to_dict
from colorpk.models.db import Color, UserLike, User


def get_all_color():
    all_color = Color.objects.all()
    return list(map(lambda x: model_to_dict(x), all_color))


def create_new_color(color, user):
    newColorParams = {
        'like': math.floor(random() * 30),
        'color': color,
        'display': 1,
        'createdate': datetime.now(timezone.utc)
    }
    if user:
        newColorParams['userid'] = user.get('id')
        newColorParams['username'] = user.get('name')

    error = False
    try:
        newColor = Color(**newColorParams)
        newColor.save()
    except:
        error = True

    return error


def create_user_like(colorId, userId):
    try:
        ul = UserLike(color_id=colorId, user_id=userId)
        ul.save()
        return False
    except:
        logging.error('Try to add duplicate to the userlike')
        return True


def delete_user_like(colorId, userId):
    try:
        ul = UserLike.objects.get(color_id=colorId, user_id=userId)
        ul.delete()
        return False
    except:
        logging.error('Try to delete records not exist on userlike table.')
        return True


def get_user_like(userId):
    list_like0 = UserLike.objects.filter(user_id=userId)
    list_like1 = list(map(lambda x: model_to_dict(x)['color'], list_like0))
    return list_like1


def check_admin(userId):
    result = User.objects.filter(id=userId, isadmin=True).exists()
    return result


def get_unpublished_colors():
    result0 = Color.objects.filter(display=True)
    result1 = list(map(lambda x: model_to_dict(x), result0))
    for one in result1:
        cls = one.get('color').split('#')
        one['color'] = list(map(lambda x: '#%s' % x, cls))
    return result1


def approve_color(id):
    thisColor = Color.objects.get(id=id)
    thisColor.display = False
    thisColor.save()
    return False


def delete_color(id):
    thisColor = Color.objects.get(id=id)
    thisColor.delete()
    return False


def sync_by_cache(data):
    for id in data.keys():
        thisColor = Color.objects.get(id=id)
        thisColor.like = thisColor.like + data.get(id)
        thisColor.save()
