import { likeAjax, localStorageEnabled } from './util';

const LSLIKEKEY = 'userLike';

class LikeManagement {
  constructor() {
    this.isAuth = window._colorpk.auth;
    this.hasLocalStorage = localStorageEnabled;
    this.likeMap = this.initLike();
  }

  initLike() {
    const res = {};
    if (this.isAuth) {
      // grab from global _colorpk
      if (Array.isArray(window._colorpk.list1)) {
        // profile page's likes, [Color]
        window._colorpk.list1.forEach(v => {
          res[v.id.toString()] = true;
        });
      } else if (Array.isArray(window._colorpk.likes)) {
        // latest or popular, [Int]
        window._colorpk.likes.forEach(v => {
          res[v.toString()] = true;
        });
      }
    } else if (this.hasLocalStorage) {
      // no auth, grab localStorage
      const currentLocalState = JSON.parse(
        window.localStorage.getItem(LSLIKEKEY)
      );
      if (Array.isArray(currentLocalState)) {
        currentLocalState.forEach(v => {
          res[v.toString()] = true;
        });
      } else {
        window.localStorage.setItem(LSLIKEKEY, JSON.stringify([]));
      }
    } else {
      // not really supported
    }
    return res;
  }

  addLike(id) {
    this.likeMap[id.toString()] = true;
    likeAjax(id, 'POST');

    if (!this.isAuth && this.hasLocalStorage) {
      const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike.push(id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }

  removeLike(id) {
    delete this.likeMap[id.toString()];
    likeAjax(id, 'DELETE');
    if (!this.isAuth && this.hasLocalStorage) {
      let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike = userLike.filter(v => v !== id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    }
  }
}

const likeManager = new LikeManagement(); // always singleton

export default likeManager;
