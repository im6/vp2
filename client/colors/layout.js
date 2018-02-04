//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import { isMobile } from '../shared/util';

const BOXWD = isMobile ? 185 : 260,
  mainElem = document.getElementsByClassName('list')[0],
  SPACEPERCENT = isMobile ? 0.99 : 0.9,
  MAXNUM = 6;

const adjustLayout = (w) => {
  if(w > 370){
    mainElem.style.width = Math.floor(w * SPACEPERCENT/BOXWD) * BOXWD + 'px';
    mainElem.style.maxWidth = `${BOXWD * MAXNUM}px`;
  } else {
    mainElem.style.width = w * 0.99 + 'px';
  }
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(window.innerWidth);