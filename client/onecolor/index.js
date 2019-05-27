import './style.scss';
import Box from '../colors/box';
import { downloadCanvas } from '../shared/util';
import likeManager from '../shared/likeManager';

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const { id, color, like } = window._colorpk.selected;
downloadBtn.href = downloadCanvas(color);

const oneBox = new Box({
  id,
  color,
  like,
  isLiked: likeManager.likeMap.hasOwnProperty(id),
  onLike: id => {
    likeManager.addLike(id);
  },
  onUnlike: id => {
    likeManager.removeLike(id);
  }
});

container.insertBefore(oneBox, downloadBtn);
window.dataLayer.push({
  'scriptLoadingTime': Date.now() - window._colorpk.load0
});
