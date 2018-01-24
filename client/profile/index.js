//https://codepen.io/JiveDig/pen/jbdJXR

import '../colors/layout';
import './style.scss';
import { Box } from '../colors/box';
import { ajax } from '../shared/util';
import '../shared/auth';

const likeAjax = (id, method) => {
  ajax({
    method,
    url: `like/${id}`,
    data: {},
    success: (v) => {
    },
    fail: () => {
    }
  });
};

const ENTRYANIMDELAY = 58;
const $listDiv = document.getElementsByClassName('list')[0];

const addColorBox = (source) => {
  const likeMode = source === 'list1';
  $listDiv.innerHTML = '';
  window._colorpk[source].forEach((v, i) => {
    console.log(v.id);
    const oneBox = Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: likeMode,
      onLike: (cid) => {
        likeAjax(cid, 'POST');
      },
      onUnlike: (cid) => {
        if(likeMode){
          const thisBox = document.querySelector(`[data-k='${cid}']`);
          $listDiv.removeChild(thisBox);
          likeAjax(cid, 'DELETE');
        }
      }
    });

    oneBox.style.animationDelay = `${(i * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  });
};

document.getElementById('switch_left').onclick = (event) => {
  addColorBox('list0');
};

document.getElementById('switch_right').onclick = (event) => {
  addColorBox('list1');
};

addColorBox('list0');

