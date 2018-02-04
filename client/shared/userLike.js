const LSLIKEKEY = 'userLike';

if('likes' in window._colorpk && window._colorpk.likes.length > 0){
  window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
} else if(window.localStorage.getItem(LSLIKEKEY)){
  // valid cachestorage
} else {
  window.localStorage.setItem(LSLIKEKEY, JSON.stringify([]));
}

export const getUserLikes = () => {
  let userLike = [];
  if('likes' in window._colorpk && window._colorpk.likes.length > 0){
    userLike = window._colorpk.likes;
    window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
  } else if(window.localStorage.getItem(LSLIKEKEY)){
    userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
  }
  return userLike;
};

export const addLike = (id) => {
  let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
  userLike.push(id);
  window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
};

export const removeLike = (id) => {
  let userLike = JSON.parse(window.localStorage.getItem(LSLIKEKEY));
  userLike = userLike.filter(v => {
    return v !== id;
  });
  window.localStorage.setItem(LSLIKEKEY, JSON.stringify(userLike));
};