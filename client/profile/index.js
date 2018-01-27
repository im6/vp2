//https://codepen.io/JiveDig/pen/jbdJXR
import '../colors/layout';
import './style.scss';
import { Box } from '../colors/box';
import { getUserLikes } from "../shared/userLike";

const ENTRYANIMDELAY = 58;
const $listDiv = document.getElementsByClassName('list')[0];

const addColorBox = (source) => {
  const USERLIKE = getUserLikes();
  const likeMode = source === 'list1';
  $listDiv.innerHTML = '';
  window._colorpk[source].forEach((v, i) => {
    const oneBox = Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: likeMode || USERLIKE.indexOf(v.id) > -1,
      onLike: (cid) => {
        if(!likeMode){
          let one = window._colorpk.list0.filter(v => v.id === cid)[0];
          window._colorpk.list1.push(one);
        }
      },
      onUnlike: (cid) => {
        if(likeMode){
          const thisBox = document.querySelector(`[data-k='${cid}']`);
          $listDiv.removeChild(thisBox);
        } else {
          window._colorpk.list1 = window._colorpk.list1.filter(v => v.id !== cid);
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

