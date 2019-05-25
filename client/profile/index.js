//https://codepen.io/JiveDig/pen/jbdJXR
import '../layout';
import './style.scss';
import Box from '../colors/box';
import { likeAjax } from '../shared/util';
import { getUserLikes, addLike, removeLike, } from "../shared/userPreference";
import { ENTRYANIMDELAY } from '../shared/constant';

const $listDiv = document.getElementsByClassName('list')[0];
let currentInd = 'list0';

const addColorBox = (source) => {
  const USERLIKE = getUserLikes();
  const likeMode = source === 'list1';
  $listDiv.innerHTML = '';
  window._colorpk[source].forEach((v, i) => {
    const { id, color, like } = v;
    const oneBox = new Box({
      id,
      color,
      like,
      isLiked: likeMode || USERLIKE.indexOf(v.id) > -1,
      onLike: id => {
        likeAjax(id, 'POST');
        addLike(id);
        if(!likeMode){
          const one = window._colorpk.list0.find(v => v.id === id);
          window._colorpk.list1.push(one);
        }
      },
      onUnlike: id => {
        likeAjax(id, 'DELETE');
        removeLike(id);
        window._colorpk.list1 = window._colorpk.list1.filter(v => v.id !== id);
        if(likeMode){
          const thisBox = document.querySelector(`[data-k='${id}']`);
          $listDiv.removeChild(thisBox);
        }
      },
      onRedir: (id) => {
        window.location.href = `/color/${id}`;
      }
    });

    try {
      const delayTime = `${(i * ENTRYANIMDELAY)}ms`;
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
  });

  if(window._colorpk[source].length < 1){
    $listDiv.innerHTML = `<h3>You have not ${likeMode ? 'liked' : 'created'} any color.</h3>`;
  }
};

document.getElementById('switch_left').onclick = (event) => {
  if(currentInd !== 'list0'){
    addColorBox('list0');
    currentInd = 'list0';
  }
};

document.getElementById('switch_right').onclick = (event) => {
  if(currentInd !== 'list1'){
    addColorBox('list1');
    currentInd = 'list1';
  }
};

addColorBox(currentInd);
