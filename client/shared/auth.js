import { ajax } from './util';

const toggleNav = (user) => {
  const navElem = document.querySelector('nav > ul');
  const signInElem = document.querySelector('.nav-signin');
  const userElem = document.createElement('li');
  userElem.className = 'nav-user';
  userElem.innerHTML = `<a href="/profile"><img src="${user.img}" alt="user icon" title="Go to ${user.name}'s Profile"></a>`;
  navElem.removeChild(signInElem);
  navElem.prepend(userElem);
};

ajax({
  method: 'GET',
  url: 'userDetail',
  success: ({user}) => {
    if(user){
      toggleNav(user)
    }
  },
  fail: () => {
  }
});