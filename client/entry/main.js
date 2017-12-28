import '../layout';
import { createBox } from '../colors';

const $listDiv = document.getElementsByClassName('list')[0];

window._colorpk.initData.forEach(v => {
  $listDiv.appendChild(createBox(v.id, v.color, v.like, false));
});
