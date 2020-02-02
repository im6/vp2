import { debounce } from '../shared/util';
import LayoutManager from './LayoutManager';
import { checkWelcome, hideWelcome } from '../shared/userPreference';

const sizeManager = new LayoutManager();
const mainElem = document.querySelector('.list');
const isWelcomeHidden = checkWelcome() && false; // todo: always show colorpk v1
const helpElem = document.querySelector('.help');

const adjustLayout = w => {
  sizeManager.windowWidth = w;
  const {
    containerWidth,
    containerWidthMax,
    helperWidth,
    helperWidthMax,
  } = sizeManager.sizeInfo;
  mainElem.style.width = containerWidth;
  mainElem.style.maxWidth = containerWidthMax;
  if (helpElem) {
    helpElem.style.width = helperWidth;
    helpElem.style.maxWidth = helperWidthMax;
  }
};

window.onresize = debounce(e => {
  adjustLayout(e.target.innerWidth);
}, 250);

adjustLayout(window.innerWidth);

if (!isWelcomeHidden && helpElem) {
  helpElem.style.display = 'block';
  window._colorpk.removeWelcome = () => {
    helpElem.parentElement.removeChild(helpElem);
    hideWelcome();
  };
}
