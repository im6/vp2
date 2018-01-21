from django.core.cache import cache
from colorpk.repository.db import getAllColor

def getColors():
    return cache.get('global_colors')

def getInvisibleColors():
    return cache.get('global_colors_inv')

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
        init_colors0 = getAllColor()
        init_colors = sorted(init_colors0, key=lambda v: v['id'], reverse=True)
        colors_visible = list(filter(lambda x:x['display'] == False, init_colors))
        colors_invisible = list(filter(lambda x:x['display'] == True, init_colors))

        cache.set('global_colors', colors_visible)
        cache.set('global_colors_inv', colors_invisible)
        cache.set('global_like', {})
    except BaseException as e:
        print('error on getting all colors')


refreshColorStore()