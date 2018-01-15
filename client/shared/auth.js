import { ajax } from './util';


const navElem = document.querySelector('nav');

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

ajax({
  method: 'GET',
  url: '/userDetail',
  success: ({user}) => {
    if(user){
      renderUser(user)
    } else {
      renderAuth();
    }
  },
  fail: () => {
  }
});