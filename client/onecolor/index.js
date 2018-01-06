import './style.scss';
import { downloadCanvas } from '../shared/util';

const canvasElem = document.getElementsByClassName('canvas')[0];
const dlBtn = document.getElementById('download');
const colorStr = canvasElem.dataset.v;
const cls = colorStr.split('#');
cls.forEach(v => {
  const clrValue = '#' + v;
  const oneBar = document.createElement('div');
  oneBar.style.backgroundColor = clrValue;
  const txt = document.createElement('span');
  txt.innerText = clrValue;
  oneBar.appendChild(txt);
  canvasElem.appendChild(oneBar);
});

dlBtn.href = downloadCanvas(colorStr);