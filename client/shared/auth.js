import { ajax } from './util';

ajax({
  method: 'GET',
  url: 'userDetail',
  success: (v) => {
    debugger;
  },
  fail: () => {
  }
});