//import 'style-loader!css-loader!purecss/build/pure-min.css';
//import 'style-loader!css-loader!purecss/build/grids-responsive-min.css';
import debounce from 'debounce';
import './style.scss';
import './header.scss';
import { calcMainBoxWidth } from '../colors';


const mainElem = document.getElementsByTagName('main')[0];
window.onresize = debounce((e) => {
  mainElem.style.width = calcMainBoxWidth(e.target.innerWidth) + 'px';
}, 200);
