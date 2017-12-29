import '../layout';
import { createBox } from '../colors';

const $listDiv = document.getElementsByClassName('list')[0];
const ENTRYANIMDELAY = 60;

window._colorpk.initData.forEach((v, k) => {
  const oneBox = createBox(v.id, v.color, v.like, false);
  oneBox.style.animationDelay = `${(k * ENTRYANIMDELAY)}ms`;
  $listDiv.appendChild(oneBox);
});
