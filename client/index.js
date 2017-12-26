import './layout';

import { createBox } from './colors';

window._colorpk.initData.forEach(v => {
  const listDom = document.getElementsByClassName('list')[0];
  const oneBox = createBox(v.id, v.color, v.like, false);
  listDom.appendChild(oneBox);
});