import './style.scss';
import Box from '../colors/box';
import { downloadCanvas } from '../shared/util';
import likeManager from '../shared/likeManager';

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const selected = window._colorpk.selected;
downloadBtn.href = downloadCanvas(selected.color);
const { id, color, like } = selected;
const oneBox = new Box({
  id,
  color,
  like,
  isLiked: likeManager.likeMap.hasOwnProperty(selected.id),
  onLike: id => {
    likeManager.addLike(id);
  },
  onUnlike: id => {
    likeManager.removeLike(id);
  }
});

container.insertBefore(oneBox, downloadBtn);
