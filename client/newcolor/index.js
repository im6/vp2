import './style.scss';
import './jscolor.min';
import dragula from 'dragula';
import swal from 'sweetalert';
import 'style-loader!css-loader!dragula/dist/dragula.min.css';
import { ajax } from '../shared/util';

const HANDLENAME = 'drgHdl',
  COLORREG = /^(?:[0-9a-fA-F]{3}){1,2}$/;

const bars = document.getElementsByClassName('jscolor'),
  canvas = document.getElementsByClassName('canvas')[0],
  textElem = document.getElementById('colorText'),
  auth = document.getElementsByClassName('nav-user').length > 0;

let currentBar = bars[0];

const resetColors = () => {
  for(let i = 0; i < 4; i ++){
    bars[i].jscolor.fromString('ffffff');
  }
  textElem.value = '';
};

const publishMsg = () => {
  const t0 = "Your new color is created successfully. We will review it before publish. Or you could sign in and have it published instantly.";
  const t1 = "Your new color is created successfully. ";
  if(auth){
    swal({
      title: "Success",
      text: t1,
      icon: "success",
      buttons: 'Got it',
    });
  } else {
    swal({
      title: "Success",
      text: t0,
      icon: "success",
      buttons: ['Got it', 'Sign in'],
    }).then(v => {
      if(v){
        window.location = "/signin";
      }
    });
  }
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
      success: ({error}) => {
        if(error){
          swal("Oops", "Color duplication detected", "error" )
        }else{
          resetColors();
          publishMsg();
        }
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

  const { defaultColors } = window._colorpk;
  if(defaultColors.length > 0){
    let c0 = defaultColors.substring(0,6);
    let c1 = defaultColors.substring(6,12);
    let c2 = defaultColors.substring(12,18);
    let c3 = defaultColors.substring(18,24);
    bars[0].jscolor.fromString(c0);
    bars[1].jscolor.fromString(c1);
    bars[2].jscolor.fromString(c2);
    bars[3].jscolor.fromString(c3);
  }

}, 600);