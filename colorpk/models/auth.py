import configparser
from abc import ABCMeta, abstractmethod

config = configparser.ConfigParser()
config.read('local/connection.cnf')

def getUrl(src, state):
    url = ''
    if src == 'wb':
        url = "https://api.weibo.com/oauth2/authorize?" \
              "client_id=%s&scope=follow_app_official_microblog&" \
              "state=%s&redirect_uri=%s"\
              %(config[src]['appkey'], state, config[src]['url'])
    elif src == 'fb':
        url = "https://www.facebook.com/v2.8/dialog/oauth?" \
              "client_id=%s&response_type=code&state=%s&redirect_uri=%s"\
              %(config[src]['appkey'], state, config[src]['url'])
    elif src == 'gg':
        url = "https://api.weibo.com/oauth2/authorize?" \
              "client_id=%s&scope=follow_app_official_microblog&" \
              "state=%s&redirect_uri=%s"\
              %(config[src]['appkey'], state, config[src]['url'])

    return url

class OAuth2(metaclass=ABCMeta):
    def __init__(self, src):
        self.api = config[src]['api']
        self.appKey = config[src]['appKey']
        self.appSecret = config[src]['appSecret']
        self.url = config[src]['url']
    def getToken(self):
        pass

    def getUserInfo(self):
        pass