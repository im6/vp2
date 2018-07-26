import debounce from 'debounce';
import { isMobile } from '../shared/util';
import { checkWelcome, hideWelcome } from '../shared/userPreference';

let BOXWD = null, BOXMARGINH = null;
let wiw = window.innerWidth;
if(wiw < 321){
  BOXMARGINH = 4;
  BOXWD = 125 + (6 + BOXMARGINH) * 2;
} else if(wiw < 769){
  BOXMARGINH = 4;
  BOXWD = 150 + (6 + BOXMARGINH) * 2;
} else {
  BOXMARGINH = 10;
  BOXWD = 220 + (7 + BOXMARGINH) * 2; //wide screen
}

const mainElem = document.getElementsByClassName('list')[0],
  helpElems = document.getElementsByClassName('help'),
  SPACEPERCENT = isMobile ? 0.99 : 0.9,
  MAXNUM = 6,
  isWelcomeHidden = checkWelcome();

const helpElem = helpElems.length > 0 ? helpElems[0] : null;

const adjustLayout = (w) => {
  const wd = Math.floor(w * SPACEPERCENT/BOXWD) * BOXWD;
  mainElem.style.width = wd + 'px';
  mainElem.style.maxWidth = `${BOXWD * MAXNUM}px`;
  if(helpElem) {
    helpElem.style.width = (wd - BOXMARGINH * 2) + 'px';
    helpElem.style.maxWidth = `${(BOXWD * MAXNUM) - (BOXMARGINH * 2)}px`;
  }
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(wiw);

if(!isWelcomeHidden && helpElem){
  helpElem.style.display = 'block';
  window._colorpk.removeWelcome = () => {
    helpElem.parentElement.removeChild(helpElem);
    hideWelcome();
  };
}