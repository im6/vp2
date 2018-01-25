import debounce from 'debounce';
import './layout';
import './style.scss';
import { Box } from './box';
import { noop } from '../shared/util';
import '../shared/auth';

const ENTRYANIMDELAY = 58,
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
    const oneBox = Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: v.isLiked,
      onLike: noop,
      onRedir: (id) => {
        window.location.href = `/color/${id}`;
      }
    });
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

