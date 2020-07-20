/* eslint-disable import/no-extraneous-dependencies  */
import '../shared/base';
import 'core-js/features/array/from';
import './style.scss';
import './jscolor.min';
import dragula from 'dragula';
import swal from 'sweetalert';
// eslint-disable-next-line
import 'style-loader!css-loader!dragula/dist/dragula.min.css';
import { ajax } from '../shared/util';
import validate from './helper/validate';

const HANDLENAME = 'drgHdl';
const COLORREG = /^(?:[0-9a-fA-F]{3}){1,2}$/;
const INIT = ['f5f5f5', 'ebebeb', 'd9d9d9', 'c7c7c7'];

const canvas = document.getElementsByClassName('canvas')[0];
const bars = Array.from(canvas.children);
const textElem = document.getElementById('colorText');
const createBtn = document.getElementById('createBtn');
const { auth } = window._colorpk;

let currentBarIndex = 0;

const setCurrent = newValue => {
  currentBarIndex = newValue;
};

const resetColors = () => {
  bars.forEach((v, k) => {
    v.jscolor.fromString(INIT[k]);
  });
  textElem.value = '';
};

const publishMsg = () => {
  const t0 =
    'Your new color is created successfully. We will review it before publish. Or you could sign in and have it published instantly.';
  const t1 = 'Your new color is created successfully. ';
  if (auth) {
    swal({
      title: 'Success',
      text: t1,
      icon: 'success',
      buttons: 'Got it',
    });
  } else {
    swal({
      title: 'Success',
      text: t0,
      icon: 'success',
      buttons: ['Got it', 'Sign in'],
    }).then(v => {
      if (v) {
        window.location = '/signin';
      }
    });
  }
};

createBtn.onclick = () => {
  const state = bars.map(v => {
    return v.jscolor.toString();
  });

  const [isValide, badReason] = validate(INIT, state);
  if (isValide) {
    createBtn.disabled = true;
    ajax({
      method: 'POST',
      url: `/create`,
      data: {
        color: state,
      },
      success: ({ error }) => {
        createBtn.disabled = false;
        if (error) {
          swal('Oops', 'Colors have already existed.', 'error');
        } else {
          resetColors();
          publishMsg();
        }
      },
      fail: () => {
        createBtn.disabled = false;
      },
    });
  } else if (badReason.badRowNum > 0) {
    swal('Oops', 'Invalid color value', 'error');
  } else if (badReason.emptyRowNum > 0) {
    swal('Oops', 'You need to fill out all columns.', 'error');
  } else if (badReason.dup > 0) {
    swal('Oops', 'Four unique colors seem a better way', 'error');
  }

};

document.getElementById('resetBtn').onclick = () => {
  resetColors();
};

window._cpOnColorChange = jsc => {
  textElem.value = jsc.toString();
};

textElem.oninput = ({ target }) => {
  const vl = target.value;
  if (COLORREG.test(vl)) {
    bars[currentBarIndex].style.backgroundColor = `#${vl}`;
    bars[currentBarIndex].jscolor.fromString(vl);
  }
};

for (let i = 0; i < 4; i += 1) {
  bars[i].innerHTML = `<h1 class="${HANDLENAME}">&#8801;</h1>`;
  bars[i].onclick = () => {
    setCurrent(i);
    textElem.value = bars[i].jscolor.toString();
  };
}

dragula([canvas], {
  moves: (el, container, handle) => {
    return handle.className === HANDLENAME;
  },
});

setTimeout(() => {
  const { defaultColors } = window._colorpk;
  if (defaultColors.length > 0) {
    const c0 = defaultColors.substring(0, 6);
    const c1 = defaultColors.substring(6, 12);
    const c2 = defaultColors.substring(12, 18);
    const c3 = defaultColors.substring(18, 24);
    bars[0].jscolor.fromString(c0);
    bars[1].jscolor.fromString(c1);
    bars[2].jscolor.fromString(c2);
    bars[3].jscolor.fromString(c3);
  } else {
    resetColors();
  }
}, 50);
