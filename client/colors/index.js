import debounce from 'debounce';
import './layout';
import './style.scss';
import { Box } from './box';
import { noop } from '../shared/util';
import { getUserLikes } from '../shared/userLike';

const ENTRYANIMDELAY = 50,
  STEP = 17,
  LIMIT = window._colorpk.initData.length,
  USERLIKE = getUserLikes();
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
      isLiked: USERLIKE.indexOf(v.id) > -1,
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