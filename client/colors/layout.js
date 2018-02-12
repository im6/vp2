//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import { isMobile } from '../shared/util';
import { checkWelcome, hideWelcome } from '../shared/userPreference';

let BOXWD = null;
let wiw = window.innerWidth;
if(wiw < 321){
  BOXWD = 145;
} else if(wiw < 769){
  BOXWD = 173;
} else {
  BOXWD = 260;
}

const mainElem = document.getElementsByClassName('list')[0],
  helpElem = document.getElementsByClassName('help')[0],
  SPACEPERCENT = isMobile ? 0.99 : 0.9,
  MAXNUM = 6,
  BOXMARGINH = 20,
  isWelcomeHidden = checkWelcome();

const adjustLayout = (w) => {
  const wd = Math.floor(w * SPACEPERCENT/BOXWD) * BOXWD;
  mainElem.style.width = wd + 'px';
  mainElem.style.maxWidth = `${BOXWD * MAXNUM}px`;
  helpElem.style.width = (wd - BOXMARGINH) + 'px';
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(wiw);

if(!isWelcomeHidden){
  helpElem.style.display = 'block';
  window._colorpk.removeWelcome = () => {
    helpElem.parentElement.removeChild(helpElem);
    hideWelcome();
  };
}