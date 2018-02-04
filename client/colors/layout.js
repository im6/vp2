//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import { isMobile } from '../shared/util';

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
  SPACEPERCENT = isMobile ? 0.99 : 0.9,
  MAXNUM = 6;

const adjustLayout = (w) => {
  mainElem.style.width = Math.floor(w * SPACEPERCENT/BOXWD) * BOXWD + 'px';
  mainElem.style.maxWidth = `${BOXWD * MAXNUM}px`;
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(wiw);