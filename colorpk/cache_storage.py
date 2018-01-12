from django.core.cache import cache
from colorpk.models.db import Color

init_colors = list(map(lambda x : x.to_dict(), Color.objects.all()))
cache.set('global_colors', init_colors)

def getColors():
    return cache.get('global_colors')

def getColor(id):
    cached_data = cache.get('global_colors')
    filter0 = list(filter(lambda v : v.get('id') == id, cached_data))[0]
    return filter0

