import debounce from 'debounce';
import './layout';
import './style.scss';
import { Box } from './box';
import { noop } from '../shared/util';
import { getUserLikes } from '../shared/userPreference';

const ENTRYANIMDELAY = 45,
  INITNUM = 31,
  STEP = 17,
  LIMIT = window._colorpk.initData.length,
  SCROLLBOUND = 100,
  USERLIKE = getUserLikes();

const $listDiv = document.getElementsByClassName('list')[0];

let currentIdx = 0;

const addColorBox = (step) => {
  for(let i = currentIdx; i < step + currentIdx; i ++) {
    const v = window._colorpk.initData[i];
    if(!v) {
      break;
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

    try {
      const delayTime = `${((i - currentIdx) * ENTRYANIMDELAY)}ms`;
      oneBox.style.animationDelay = delayTime;
      const rows = oneBox.querySelectorAll('.canvas > div');
      for(let rid = 0; rid < 4; rid ++){
        rows[rid].style.animationDelay = delayTime;
      }
    }
    catch(error) {
      console.warn('browser compatible');
    }

    $listDiv.appendChild(oneBox);
  }

  currentIdx += step;
};

window.onscroll = debounce(evt => {
  const bodyElem = evt.target.scrollingElement || evt.target.activeElement;
  const htmlElem = document.documentElement;
  let position = bodyElem.scrollTop || htmlElem.scrollTop;
  const offset = htmlElem.scrollHeight - position - htmlElem.clientHeight;

  if(offset < SCROLLBOUND && currentIdx < LIMIT) {
    addColorBox(STEP);
  }
}, 200);

addColorBox(INITNUM);