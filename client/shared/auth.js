import { ajax } from './util';


const navElem = document.querySelector('nav');

const renderUser = (user) => {
  const elem = document.createElement('div');
  elem.className = 'nav-user';
  elem.innerHTML = `<img src="${user.img}" alt="icon"><div><a href="/profile">${user.name}</a><a href="/signout">Sign out</a></div>`;
  navElem.appendChild(elem);
};

const renderAuth = () => {
  const elem = document.createElement('a');
  a.className = 'nav-auth';
  a.href = '/signin';
  a.innerText = 'Sign In';
  navElem.appendChild(a);
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