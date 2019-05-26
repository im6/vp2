import { likeAjax, localStorageEnabled } from './util';

const LSLIKEKEY = 'userLike';

class LikeManagement {
  constructor(){
    this.isAuth = window._colorpk.user.length > 0;
    this.hasLocalStorage = localStorageEnabled;
    try {
      this.likeMap = this.initLike();
    } catch (err) {
      this.likeMap = {};
      ga('send', 'exception', {
        'exDescription': err.message,
        'exFatal': false
      });
    }
  }
  initLike(){
    let res = {}
    if(this.isAuth){
      if(window._colorpk.hasOwnProperty('list1')){
        window._colorpk.list1.forEach(v => {
          res[v.id.toString()] = true;
        });
      } else if(Array.isArray(window._colorpk.likes)) {
        window._colorpk.likes.forEach(v => {
          res[v.toString()] = true;
        });
      }
    } else if(this.hasLocalStorage) {
      const currentLocalState = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      if(Array.isArray(currentLocalState)){
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

  addLike(id){
    this.likeMap[id.toString()] = true;
    likeAjax(id, 'POST');
  
    if(this.isAuth){
      // todo
    } else if(this.hasLocalStorage) {
      const userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike.push(id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    } else {
      // todo
    }
  }

  removeLike(id){
    delete this.likeMap[id.toString()];
    likeAjax(id, 'DELETE');
    if(this.isAuth){
      // todo
    } else if(this.hasLocalStorage) {
      let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
      userLike = userLike.filter(v => v !== id);
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    } else {
      // todo
    }
  }
}

const likeManager = new LikeManagement();
export default likeManager;