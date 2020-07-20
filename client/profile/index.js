import '../shared/base';
import '../layout';
import './style.scss';
import Box from '../box';
import likeManager from '../shared/likeManager';
import { ENTRYANIMDELAY } from '../shared/constant';

const $listDiv = document.getElementsByClassName('list')[0];
const tab = {
  portfolio: 'list0',
  like: 'list1',
};
let currentTab = tab.portfolio;

const addColorBox = source => {
  const likeMode = source === tab.like;
  $listDiv.innerHTML = '';
  window._colorpk[source].forEach((v, i) => {
    const { id, color, like } = v;
    const oneBox = new Box({
      id,
      color,
      like,
      isLiked:
        likeMode ||
        Object.prototype.hasOwnProperty.call(likeManager.likeMap, v.id),
      onLike: id0 => {
        likeManager.addLike(id0);
        if (!likeMode) {
          const one = window._colorpk[tab.portfolio].find(v0 => v0.id === id0);
          window._colorpk[tab.like].push(one);
        }
      },
      onUnlike: id0 => {
        likeManager.removeLike(id0);
        window._colorpk[tab.like] = window._colorpk[tab.like].filter(
          v0 => v0.id !== id0
        );
        if (likeMode) {
          const thisBox = document.querySelector(`[data-k='${id0}']`);
          $listDiv.removeChild(thisBox);
        }
      },
      onRedir: id0 => {
        window.location.href = `/color/${id0}`;
      },
    });

    try {
      const delayTime = `${i * ENTRYANIMDELAY}ms`;
      oneBox.style.animationDelay = delayTime;
      const rows = oneBox.querySelectorAll('.canvas > div');
      for (let rid = 0; rid < 4; rid += 1) {
        rows[rid].style.animationDelay = delayTime;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('browser compatible');
    }

    $listDiv.appendChild(oneBox);
  });

  if (window._colorpk[source].length < 1) {
    $listDiv.innerHTML = `<h3>You have not ${
      likeMode ? 'liked' : 'created'
      } any color.</h3>`;
  }
};

document.getElementById('switch_left').onclick = () => {
  if (currentTab !== tab.portfolio) {
    addColorBox(tab.portfolio);
    currentTab = tab.portfolio;
  }
};

document.getElementById('switch_right').onclick = () => {
  if (currentTab !== tab.like) {
    addColorBox(tab.like);
    currentTab = tab.like;
  }
};

addColorBox(currentTab);
