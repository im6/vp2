//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import './style.scss';

const BOXWD = 260;
const mainElem = document.getElementsByClassName('list')[0];

const adjustLayout = (w) => {
  mainElem.style.width = Math.floor(w * 0.9/BOXWD) * BOXWD + 'px';
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 200);

adjustLayout(window.innerWidth);