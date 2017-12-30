import debounce from 'debounce';
import './layout';
import { createBox } from './service';

const ENTRYANIMDELAY = 60,
  STEP = 20,
  LIMIT = window._colorpk.initData.length;
const $listDiv = document.getElementsByClassName('list')[0];
let currentIdx = 0;


const addColorBox = (startIndex) => {
  for(let i = startIndex; i < startIndex + STEP; i ++){
    let v = window._colorpk.initData[i];
    let k = i - startIndex;
    const oneBox = createBox(v.id, v.color, v.like, false);
    oneBox.style.animationDelay = `${(k * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  }
};


addColorBox(currentIdx);
currentIdx += STEP;


document.body.onscroll = debounce(evt => {
  let e = evt.target.scrollingElement;
  let offset = e.scrollHeight - e.scrollTop - window.innerHeight;
  console.log(currentIdx);
  if(offset < 50 && currentIdx < LIMIT - STEP - 1) {
    addColorBox(currentIdx);
    currentIdx = Math.min(LIMIT - 1, currentIdx + STEP);
  }
}, 250);

