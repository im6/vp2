import './layout';
import './style.scss';
import Box from './box';
import { debounce, likeAjax } from '../shared/util';
import { getUserLikes, addLike, removeLike, } from '../shared/userPreference';
import { ENTRYANIMDELAY, INITNUM, STEP, SCROLLBOUND, } from '../shared/constant';

const LIMIT = window._colorpk.initData.length,
  USERLIKE = getUserLikes();

const $listDiv = document.getElementsByClassName('list')[0];
let currentIdx = 0;

const addColorBox = (step) => {
  for(let i = 0; i < step; i ++) {
    const v = window._colorpk.initData[i + currentIdx];
    if(!v) {
      step = i;
      break;
    }
    const oneBox = new Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: USERLIKE.indexOf(v.id) > -1,
      animDelay: `${(i * ENTRYANIMDELAY)}ms`,
      onLike: id => {
        likeAjax(id, 'POST');
        addLike(id);
      },
      onUnlike: id => {
        likeAjax(id, 'DELETE');
        removeLike(id);
      },
      onRedir: (id) => {
        window.location.href = `/color/${id}`;
      }
    });

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