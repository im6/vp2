from django.core.cache import cache
from colorpk.repository.db import getAllColor, syncByCache
import logging

BUFFERSIZE = 3
GLOBAL_COLOR_KEY = 'global_colors'
GLOBAL_COLOR_INV_KEY = 'global_colors_inv'
GLOBAL_LIKE_KEY = 'global_like'
GLOBAL_CNT_KEY = 'global_cnt'

def getColors():
    return cache.get(GLOBAL_COLOR_KEY)

def getInvisibleColors():
    return cache.get(GLOBAL_COLOR_KEY)

def getColor(id):
    filter0 = list(filter(lambda v : v.get('id') == id, cache.get(GLOBAL_COLOR_KEY) + cache.get(GLOBAL_COLOR_INV_KEY)))
    if len(filter0) > 0:
        return filter0[0]
    else:
        logging.error('onecolor page not found %s' %(id))
        return None

def like(id):
    like_obj = cache.get(GLOBAL_LIKE_KEY)
    like_obj[id] = like_obj.get(id, 0) + 1
    cache.set(GLOBAL_LIKE_KEY, like_obj)

    rawValue = cache.get(GLOBAL_COLOR_KEY)
    for one in rawValue:
        if one.get('id') == id:
            one['like'] += 1
    cache.set(GLOBAL_COLOR_KEY, rawValue)

    cntPlus()
    if cache.get(GLOBAL_CNT_KEY) > BUFFERSIZE:
        syncDB()
        refreshColorStore()

def refreshColorStore():
    logging.debug('refreshing cache data from db...')
    try:
        init_colors0 = getAllColor()
        init_colors = sorted(init_colors0, key=lambda v: v['id'], reverse=True)
        colors_visible = list(filter(lambda x: not x['display'], init_colors))
        colors_invisible = list(filter(lambda x: x['display'], init_colors))

        cache.set(GLOBAL_COLOR_KEY, colors_visible)
        cache.set(GLOBAL_COLOR_INV_KEY, colors_invisible)
        cache.set(GLOBAL_LIKE_KEY, {})
        cache.set(GLOBAL_CNT_KEY, 0)
    except BaseException as e:
        logging.error('error on getting all colors')

def cntPlus():
    cnt = cache.get(GLOBAL_CNT_KEY)
    cnt = cnt + 1
    cache.set(GLOBAL_CNT_KEY, cnt)

def syncDB():
    logging.debug('sync db with cache...')
    like_obj = cache.get(GLOBAL_LIKE_KEY)
    print(like_obj)
    syncByCache(like_obj)

refreshColorStore()