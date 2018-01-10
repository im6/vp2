//https://codepen.io/JiveDig/pen/jbdJXR

import '../colors/layout';
import './style.scss';
import { Box } from '../colors/box';
import { ajax } from '../shared/util';
import '../shared/auth';

const likeAjax = (id) => {
  ajax({
    method: 'POST',
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


const addColorBox = () => {
  window._colorpk.list0.forEach((v, i) => {
    const oneBox = Box({
      id: v.id,
      value: v.color,
      like: v.like,
      isLiked: false,
      onLike: (i) => {
        likeAjax(i);
      },
      onUnlike: (id) => {
        debugger;
      }
    });
    oneBox.style.animationDelay = `${(i * ENTRYANIMDELAY)}ms`;
    $listDiv.appendChild(oneBox);
  });
};

addColorBox();

