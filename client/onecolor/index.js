import './style.scss';
import { downloadCanvas, noop, ajax } from '../shared/util';
import '../shared/auth';
import { Box } from '../colors/box';

const downloadBtn = document.getElementById('download');
const container = document.getElementsByClassName('container')[0];
const selected = window._colorpk.selected;
downloadBtn.href = downloadCanvas(selected.color);

const likeAjax = (id) => {
  ajax({
    method: 'POST',
    url: `/like/${id}`,
    data: {},
    success: (v) => {
    },
    fail: () => {
    }
  });
};

const oneBox = Box({
  id: selected.id,
  value: selected.color,
  like: selected.like,
  isLiked: false,
  onLike: (i) => {
    likeAjax(i);
  },
  onRedir: noop
});

container.insertBefore(oneBox, downloadBtn);

