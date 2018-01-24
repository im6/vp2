import { ajax } from './util';


const navElem = document.querySelector('nav');
const loadingElem = document.getElementById('authLoading');

const renderUser = (user) => {
  const elem = document.createElement('div');
  elem.className = 'nav-user';
  elem.innerHTML = `<img src="${user.img}" alt="icon"><div><a href="/profile">${user.name}</a><a href="/signin">Sign out</a></div>`;
  navElem.appendChild(elem);
};

const renderAuth = () => {
  const elem = document.createElement('a');
  elem.className = 'nav-auth';
  elem.href = '/signin';
  elem.innerText = 'Sign In';
  navElem.appendChild(elem);
};

const renderLike = (list) => {
  window._colorpk.initData.forEach(v => {
    v.isLiked = list.indexOf(v.id) > -1;
  });
  window._colorpk.list0.forEach(v => {
    v.isLiked = list.indexOf(v.id) > -1;
  });

  const boxes = document.getElementsByClassName('box');
  for(let i = 0; i < boxes.length; i ++){
    if(list.indexOf(parseInt(boxes[i].dataset.k)) > -1){
      boxes[i].childNodes[1].innerHTML = boxes[i].childNodes[1].innerHTML.replace('hrt.svg', 'hrtr.svg');
    }
  }
};

ajax({
  method: 'GET',
  url: '/userDetail',
  success: ({user, like}) => {
    if(user){
      renderUser(user);
      navElem.removeChild(loadingElem);
      renderLike(like)
    } else {
      renderAuth();
      navElem.removeChild(loadingElem);
    }
  },
  fail: () => {
  }
});