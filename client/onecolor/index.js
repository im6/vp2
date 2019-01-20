import './style.scss';
import { downloadCanvas, noop, likeAjax } from '../shared/util';
import Box from '../colors/box';
import { getUserLikes, addLike, removeLike, } from "../shared/userPreference";

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const selected = window._colorpk.selected;
downloadBtn.href = downloadCanvas(selected.color);

const oneBox = new Box({
  id: selected.id,
  value: selected.color,
  like: selected.like,
  isLiked: getUserLikes().indexOf(selected.id) > -1,
  onLike: id => {
    likeAjax(id, 'POST');
    addLike(id);
  },
  onUnlike: id => {
    likeAjax(id, 'DELETE');
    removeLike(id);
  }
});

container.insertBefore(oneBox, downloadBtn);

