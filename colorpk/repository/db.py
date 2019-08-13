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
    new_color_params = {
        'like': math.floor(random() * 30),
        'color': color,
        'display': 1,
        'createdate': datetime.now(timezone.utc)
    }
    if user:
        new_color_params['userid'] = user.get('id')
        new_color_params['username'] = user.get('name')

    error = False
    try:
        new_color = Color(**new_color_params)
        new_color.save()
    except:
        error = True

    return error


def create_user_like(colorId, userId):
    try:
        user_like_item = UserLike(color_id=colorId, user_id=userId)
        user_like_item.save()
        return False
    except:
        logging.error('Try to add duplicate to the userlike')
        return True


def delete_user_like(colorId, userId):
    try:
        user_like_item = UserLike.objects.get(color_id=colorId, user_id=userId)
        user_like_item.delete()
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
    this_color = Color.objects.get(id=id)
    this_color.display = False
    this_color.save()
    return False


def delete_color(id):
    this_color = Color.objects.get(id=id)
    this_color.delete()
    return False


def sync_by_cache(data):
    for id in data.keys():
        this_color = Color.objects.get(id=id)
        this_color.like = this_color.like + data.get(id)
        this_color.save()
