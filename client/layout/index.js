import { debounce } from '../shared/util';
import LayoutManager from './LayoutManager';
import { checkWelcome, hideWelcome } from '../shared/userPreference';

const sizeManager = new LayoutManager();
const mainElem = document.querySelector('.list'),
  isWelcomeHidden = checkWelcome(),
  helpElem = document.querySelector('.help');

const adjustLayout = (w) => {
  sizeManager.updateWinWidth(w);
  const {
    width,
    maxWidth,
    helpWidth,
    helpMaxWidth,
  } = sizeManager.containerWidth;
  mainElem.style.width = width;
  mainElem.style.maxWidth = maxWidth;
  if(helpElem) {
    helpElem.style.width = helpWidth;
    helpElem.style.maxWidth = helpMaxWidth;
  }
};

window.onresize = debounce((e) => {
  adjustLayout(e.target.innerWidth);
}, 250);

adjustLayout(window.innerWidth);

if(!isWelcomeHidden && helpElem){
  helpElem.style.display = 'block';
  window._colorpk.removeWelcome = () => {
    helpElem.parentElement.removeChild(helpElem);
    hideWelcome();
  };
}