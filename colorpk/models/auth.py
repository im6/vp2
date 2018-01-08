import configparser
import requests
import json
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
        url = "https://accounts.google.com/o/oauth2/v2/auth?" \
              "client_id=%s&scope=https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile&" \
              "response_type=code&state=%s&redirect_uri=%s"\
              %(config[src]['appkey'], state, config[src]['url'])

    return url

class OAuth2():
    def __init__(self, src):
        self.oauth = src
        self.api = config[src]['api']
        self.appKey = config[src]['appKey']
        self.appSecret = config[src]['appSecret']
        self.url = config[src]['url']
    def getToken(self, code):
        pass
    def getUserInfo(self, token):
        pass

class OAuth2_fb(OAuth2):
    def __init__(self):
        super().__init__('fb')

    def getToken(self, code):
        payload = {
            "client_id": config[self.oauth]['appKey'],
            "client_secret": config[self.oauth]['appSecret'],
            "code": code,
            "redirect_uri": config[self.oauth]['url'],
        }
        r = requests.get("%s/oauth/access_token" % config[self.oauth]['api'], params=payload)
        res = json.loads(r.text)
        token = res['access_token'] if 'access_token' in res else ''
        return token

    def getUserInfo(self, token):
        payload = {
            "access_token": token,
            "fields": 'id,name,picture'
        }
        r = requests.get("%s/me" % config[self.oauth]['api'], params=payload)
        res = json.loads(r.text)
        data = {
            "id": res["id"],
            "name": res["name"],
            "isAdmin": False,
            "img": res['picture']['data']['url'],
            "oauth": self.oauth
        }
        return data


class OAuth2_wb(OAuth2):
    def __init__(self):
        super().__init__('wb')
        self.uid = None

    def getToken(self, code):
        payload = {
            "client_id": config[self.oauth]['appKey'],
            "client_secret": config[self.oauth]['appSecret'],
            "code": code,
            "grant_type": 'authorization_code',
            "redirect_uri": config[self.oauth]['url'],
        }
        r = requests.post("%s/oauth2/access_token" % config[self.oauth]['api'], data=payload)
        res = json.loads(r.text)
        if 'access_token' in res:
            token = res['access_token']
            self.uid = res['uid']
        else:
            token = ''
        return token

    def getUserInfo(self, token):
        payload = {
            "access_token": token,
            "uid": self.uid
        }
        r = requests.get("%s/2/users/show.json" % config[self.oauth]['api'], params=payload)
        res = json.loads(r.text)
        data = {
            "id": res["id"],
            "name": res["name"],
            "isAdmin": False,
            "img": res['profile_image_url'],
            "oauth": self.oauth
        }
        return data


class OAuth2_gg(OAuth2):
    def __init__(self):
        super().__init__('gg')

    def getToken(self, code):
        payload = {
            "code": code,
            "client_id": config[self.oauth]['appKey'],
            "client_secret": config[self.oauth]['appSecret'],
            "redirect_uri": config[self.oauth]['url'],
            "grant_type": "authorization_code"
        }
        r = requests.post("https://www.googleapis.com/oauth2/v4/token", data=payload)
        res = json.loads(r.text)
        token = res['access_token'] if 'access_token' in res else ''
        return token

    def getUserInfo(self, token):
        payload = {
            "access_token": token,
        }
        r = requests.get("https://www.googleapis.com/plus/v1/people/me", params=payload)
        res = json.loads(r.text)
        data = {
            "id": res["id"],
            "name": res["displayName"],
            "isAdmin": False,
            "img": res['image']['url'],
            "oauth": self.oauth
        }
        return data