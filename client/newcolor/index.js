import './style.scss';
import './jscolor.min';
import dragula from 'dragula';
import swal from 'sweetalert';
import 'style-loader!css-loader!dragula/dist/dragula.min.css';
import { ajax } from '../shared/util';
import '../shared/auth';

const HANDLENAME = 'drgHdl',
  COLORREG = /^(?:[0-9a-fA-F]{3}){1,2}$/;

const bars = document.getElementsByClassName('jscolor'),
  canvas = document.getElementsByClassName('canvas')[0],
  textElem = document.getElementById('colorText');

let currentBar = bars[0];

const resetColors = () => {
  for(let i = 0; i < 4; i ++){
    bars[i].jscolor.fromString('ffffff');
  }
  textElem.value = '';
};

document.getElementById('createBtn').onclick = () => {
  const state = [].slice.call(bars).map(v => {
    return v.jscolor.toString();
  });
  if(state.filter(v => v === 'ffffff').length > 1){
    swal("Oops", "You need to fill out all columns", "error" )
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


window._cpOnColorChange = (jsc) => {
  textElem.value = jsc.toString();
};

textElem.oninput = ({ target }) => {
  const vl = target.value;
  if(COLORREG.test(vl)) {
    currentBar.style.backgroundColor = '#' + vl;
    currentBar.jscolor.fromString(vl);
  }
};

for(let i = 0; i < 4; i ++){
  bars[i].innerHTML = `<h1 class="${HANDLENAME}">&#8801;</h1>`;
  bars[i].onclick = ({target}) => {
    currentBar = target;
    textElem.value = target.jscolor.toString();
  };
}

dragula([canvas],{
  moves: (el, container, handle) => {
    return handle.className === HANDLENAME;
  },
});

setTimeout(() => {
  canvas.style.height = '200px'; // for dragular effect
}, 600);