import './style.scss';
import './jscolor.min';
import dragula from 'dragula';
import 'style-loader!css-loader!dragula/dist/dragula.min.css';
import { ajax } from '../shared/util';

const HANDLENAME = 'drgHdl';
const bars = document.getElementsByClassName('jscolor');
const canvas = document.getElementsByClassName('canvas')[0];

const resetColors = () => {
  for(let i = 0; i < 4; i ++){
    bars[i].jscolor.fromString('ffffff');
  }
};

document.getElementById('createBtn').onclick = () => {
  const state = [].slice.call(bars).map(v => {
    return v.jscolor.toString();
  });
  if(state.filter(v => v === 'ffffff').length > 1){
    // not valid color here
  } else {
    ajax({
      method: 'POST',
      url: `/create`,
      data: {
        color: state,
      },
      success: (v) => {
        resetColors();
      },
      fail: () => {
      }
    });
  }
};

document.getElementById('resetBtn').onclick = () => {
  resetColors();
};

for(let i = 0; i < 4; i ++){
  bars[i].innerHTML = `<h1 class="${HANDLENAME}">&#8801;</h1>`
}

dragula([canvas],{
  moves: (el, container, handle) => {
    return handle.className === HANDLENAME;
  },
});

setTimeout(() => {
  canvas.style.height = '200px'; // for dragular effect
}, 600);