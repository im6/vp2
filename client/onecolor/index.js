import './style.scss';
import { downloadCanvas, noop } from '../shared/util';
import { Box } from '../colors/box';

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const selected = window._colorpk.selected;
downloadBtn.href = downloadCanvas(selected.color);

const oneBox = Box({
  id: selected.id,
  value: selected.color,
  like: selected.like,
  isLiked: false,
  onLike: noop,
  onRedir: noop
});

container.insertBefore(oneBox, downloadBtn);

