//https://codepen.io/JiveDig/pen/jbdJXR
import '../colors/layout';
import './style.scss';
import { Box } from '../colors/box';
import { ajax, noop } from '../shared/util';

const unlikeAjax = (id) => {
  ajax({
    method: 'DELETE',
    url: `/like/${id}`,
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
    const oneBox = Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: likeMode || v.isLiked,
      onLike: noop,
      onUnlike: (cid) => {
        if(likeMode){
          const thisBox = document.querySelector(`[data-k='${cid}']`);
          $listDiv.removeChild(thisBox);
          unlikeAjax(cid);
        }
      }
    });

    oneBox.style.animationDelay = `${(i * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  });

  if(window._colorpk[source].length < 1){
    if(likeMode){
      $listDiv.innerHTML = '<h3>You have not liked any color.</h3>';
    } else {
      $listDiv.innerHTML = '<h3>You have not created any color.</h3>';
    }
  }
};

document.getElementById('switch_left').onclick = (event) => {
  addColorBox('list0');
};

document.getElementById('switch_right').onclick = (event) => {
  addColorBox('list1');
};

addColorBox('list0');

