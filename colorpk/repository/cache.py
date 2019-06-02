import logging
from django.conf import settings
from django.core.cache import cache
from colorpk.repository.db import getAllColor, syncByCache

BUFFERSIZE = 3 if settings.DEBUG else 50
GLOBAL_COLOR_KEY = 'global_colors'
GLOBAL_COLOR_INV_KEY = 'global_colors_inv' # invisible new-created color
GLOBAL_LIKE_KEY = 'global_like' # like buffer object
GLOBAL_CNT_KEY = 'global_cnt' # cnt to save buffer

def colorpk_like_buffer(function):
    def wrapper(*args, **kwargs):
        cntPlus()
        if cache.get(GLOBAL_CNT_KEY) > BUFFERSIZE:
            cache.set(GLOBAL_CNT_KEY, 0)
            syncAndRefresh()
        return function(*args, **kwargs)
    return wrapper

def cntPlus() -> None:
    cnt = cache.get(GLOBAL_CNT_KEY)
    cnt += 1
    cache.set(GLOBAL_CNT_KEY, cnt)

def getColors():
    data = cache.get(GLOBAL_COLOR_KEY)
    if not data:
        syncAndRefresh()
        data = cache.get(GLOBAL_COLOR_KEY)
    return data

def getInvisibleColors():
    return cache.get(GLOBAL_COLOR_INV_KEY)

def getCachedLikes():
    return cache.get(GLOBAL_LIKE_KEY)

def getColor(id):
    filter0 = list(filter(lambda v : v.get('id') == id, cache.get(GLOBAL_COLOR_KEY) + cache.get(GLOBAL_COLOR_INV_KEY)))
    if filter0:
        return filter0[0]
    else:
        logging.error('ColorID(%s) not found' % (id))
        return None

def like(id) -> None:
    like_obj = cache.get(GLOBAL_LIKE_KEY)
    like_obj[id] = like_obj.get(id, 0) + 1
    cache.set(GLOBAL_LIKE_KEY, like_obj)

    rawValue = cache.get(GLOBAL_COLOR_KEY)
    for one in rawValue:
        if one.get('id') == id:
            one['like'] += 1
            break
    cache.set(GLOBAL_COLOR_KEY, rawValue)

def refreshColorStore() -> None:
    logging.debug('refreshing cache data from db...')
    try:
        init_colors0 = getAllColor()
        init_colors = sorted(init_colors0, key=lambda v: v['id'], reverse=True)
        colors_visible = list(filter(lambda x: not x['display'], init_colors))
        colors_invisible = list(filter(lambda x: x['display'], init_colors))

        cache.set(GLOBAL_COLOR_KEY, colors_visible)
        cache.set(GLOBAL_COLOR_INV_KEY, colors_invisible)
    except BaseException as e:
        logging.error('error on getting all colors')

def syncDB() -> None:
    logging.debug('sync db with cache...')
    like_obj = cache.get(GLOBAL_LIKE_KEY)
    syncByCache(like_obj)
    cache.set(GLOBAL_LIKE_KEY, {})

def syncAndRefresh() -> bool:
    logging.debug('sync and refresh...')
    print("sync cache")
    try:
        syncDB()
        refreshColorStore()
        return False
    except Exception as e:
        return True


# =============== initial state =====================

cache.set(GLOBAL_LIKE_KEY, {})
cache.set(GLOBAL_CNT_KEY, 0)
refreshColorStore()
