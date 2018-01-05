//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import '../shared/layout.scss';
import { isMobile } from '../shared/util';

const BOXWD = isMobile ? 185 : 260;
const mainElem = document.getElementsByClassName('list')[0];
const SPACEPERCENT = isMobile ? 0.99 : 0.9;

const adjustLayout = (w) => {
  mainElem.style.width = Math.floor(w * SPACEPERCENT/BOXWD) * BOXWD + 'px';
  mainElem.style.maxWidth = `${BOXWD * 5}px`;
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(window.innerWidth);