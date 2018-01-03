import debounce from 'debounce';
import './layout';
import './style.scss';
import { createBox } from './box';

const ENTRYANIMDELAY = 60,
  STEP = 11,
  LIMIT = window._colorpk.initData.length;
const $listDiv = document.getElementsByClassName('list')[0];

let currentIdx = 0;

const addColorBox = (startIndex) => {
  for(let i = 0; i < STEP; i ++) {
    const v = window._colorpk.initData[startIndex + i];
    if(!v) {
      return;
    }
    const oneBox = createBox(v.id, v.color, v.like, false);
    oneBox.style.animationDelay = `${(i * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  }
};


addColorBox(currentIdx);
currentIdx += STEP;

document.body.onscroll = debounce(evt => {
  const e = evt.target.scrollingElement;
  const offset = e.scrollHeight - e.scrollTop - window.innerHeight;

  if(offset < 80 && currentIdx < LIMIT) {
    addColorBox(currentIdx);
    currentIdx += STEP;
  }
}, 200);

