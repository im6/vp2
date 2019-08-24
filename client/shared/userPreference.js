import { localStorageEnabled } from './util';

const WELCOMEKEY = 'hideWelcome';
const DISABLEWELCOMEVALUE = '1';

export const checkWelcome = () => {
  if (localStorageEnabled) {
    return window.localStorage.getItem(WELCOMEKEY) === DISABLEWELCOMEVALUE;
  }
  return false;
};

export const hideWelcome = () => {
  if (localStorageEnabled) {
    window.localStorage.setItem(WELCOMEKEY, DISABLEWELCOMEVALUE);
  }
};
