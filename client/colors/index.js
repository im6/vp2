import '../layout';
import './style.scss';
import Box from './box';
import { debounce } from '../shared/util';
import { ENTRYANIMDELAY, INITNUM, STEP, SCROLLBOUND, } from '../shared/constant';
import likeManager from '../shared/likeManager';

const LIMIT = window._colorpk.initData.length;

const $listDiv = document.getElementsByClassName('list')[0];
let currentIdx = 0;

const addColorBox = (step) => {
  for(let i = 0; i < step; i ++) {
    const v = window._colorpk.initData[i + currentIdx];
    if(!v) {
      step = i;
      break;
    }
    const { id, like, color, } = v;
    const oneBox = new Box({
      id,
      color,
      like,
      isLiked: likeManager.likeMap.hasOwnProperty(v.id),
      animDelay: `${(i * ENTRYANIMDELAY)}ms`,
      onLike: id => {
        likeManager.addLike(id);
      },
      onUnlike: id => {
        likeManager.removeLike(id);
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

window.dispatchEvent(new Event('_COLORPK_SCRIPT_READY'));
