const LSLIKEKEY = 'userLike',
  WELCOMEKEY = 'hideWelcome',
  DISABLEWELCOMEVALUE = '1';

const clearLocalStorage = () => {
  let ks = Object.keys(window.localStorage);
  let hasOldStorage = ks.some(v => {
    return v !== LSLIKEKEY && v !== WELCOMEKEY;
  });

  if(hasOldStorage) {
    window.localStorage.clear();
    console.warn('clear old localstorage');
  }
};

try {
  clearLocalStorage();
  if('likes' in window._colorpk && window._colorpk.likes.length > 0){
    window.localStorage.setItem(LSLIKEKEY, JSON.stringify(window._colorpk.likes));
  } else if(window.localStorage.getItem(LSLIKEKEY)){
    // valid cachestorage
  } else {
    window.localStorage.setItem(LSLIKEKEY, JSON.stringify([]));
  }
}
catch (e) {
  console.warn('localstorage access denied.');
}

export const getUserLikes = () => {
  let userLike = [];
  try {
    if('likes' in window._colorpk && window._colorpk.likes.length > 0){
      userLike = window._colorpk.likes;
      window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
    } else if(window.localStorage.getItem(LSLIKEKEY)){
      userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
    }
  } catch(e) {
    console.warn('localstorage access denied.');
  }

  return userLike;
};

export const addLike = (id) => {
  try {
    let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
    userLike.push(id);
    window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
  } catch(e){
    console.warn('localstorage access denied.');
  }
};

export const removeLike = (id) => {
  try {
    let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
    userLike = userLike.filter(v => {
      return v !== id;
    });
    window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
  } catch(e){
    console.warn('localstorage access denied.');
  }
};

export const checkWelcome = () => {
  let result = false;
  try {
    result = window.localStorage.getItem(WELCOMEKEY) === DISABLEWELCOMEVALUE;
  } catch(e){
    console.warn('localstorage access denied.');
  }
  return result;
};

export const hideWelcome = () => {
  try {
    window.localStorage.setItem(WELCOMEKEY, DISABLEWELCOMEVALUE);
  } catch(e){
    console.warn('localstorage access denied.');
  }
};