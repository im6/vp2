import debounce from 'debounce';
import './layout';
import './style.scss';
import { Box } from './box';
import { noop } from '../shared/util';
import { getUserLikes } from '../shared/userLike';

const ENTRYANIMDELAY = 45,
  INITNUM = 31,
  STEP = 17,
  LIMIT = window._colorpk.initData.length,
  USERLIKE = getUserLikes();

const $listDiv = document.getElementsByClassName('list')[0],
  scrollBody = document.getElementsByTagName('html')[0];

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
    oneBox.style.animationDelay = `${((i - currentIdx) * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  }

  currentIdx += step;
};

document.body.onscroll = debounce(evt => {
  const offset = scrollBody.scrollHeight - scrollBody.scrollTop - window.innerHeight;

  if(offset < 80 && currentIdx < LIMIT) {
    addColorBox(STEP);
  }
}, 200);

addColorBox(INITNUM);