from django.core.cache import cache
from colorpk.models.db import Color

def getColors():
    return cache.get('global_colors')

def getColor(id):
    cached_data = cache.get('global_colors')
    filter0 = list(filter(lambda v : v.get('id') == id, cached_data))[0]
    return filter0

def like(id):
    like_obj = cache.get('global_like')
    like_obj[id] = like_obj.get(id, 0) + 1
    cache.set('global_like', like_obj)

    rawValue = cache.get('global_colors')
    for one in rawValue:
        if one.get('id') == id:
            one['like'] += 1
    cache.set('global_colors', rawValue)

def refreshColorStore():
    try:
        init_colors0 = list(map(lambda x: x.to_dict(), Color.objects.filter(display=False)))
        init_colors = sorted(init_colors0, key=lambda v: v['id'], reverse=True)
        cache.set('global_colors', init_colors)
        cache.set('global_like', {})
    except BaseException as e:
        print('error on getting all colors')


refreshColorStore()