from django.core.cache import cache
from colorpk.models.db import Color

init_colors = list(map(lambda x : x.to_dict(), Color.objects.all()))
cache.set('global_colors', init_colors)
cache.set('global_like', {})

def getColors():
    rawValue = cache.get('global_colors')
    like_obj = cache.get('global_like')
    for one in rawValue:
        if one.get('id') in like_obj and like_obj.get(one.get('id')) > 0:
            one['like'] += like_obj.get(one.get('id'))
    return rawValue

def getColor(id):
    cached_data = cache.get('global_colors')
    filter0 = list(filter(lambda v : v.get('id') == id, cached_data))[0]
    return filter0

def like(id):
    like_obj = cache.get('global_like')
    current_like = like_obj.get(id, 0)
    like_obj[id] = current_like + 1
    cache.set('global_like', like_obj)