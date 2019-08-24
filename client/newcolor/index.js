/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle,  */

import './style.scss';
import './jscolor.min';
import dragula from 'dragula';
import swal from 'sweetalert';
// eslint-disable-next-line
import 'style-loader!css-loader!dragula/dist/dragula.min.css';
import { ajax } from '../shared/util';

const HANDLENAME = 'drgHdl';
const COLORREG = /^(?:[0-9a-fA-F]{3}){1,2}$/;
const INIT = ['f5f5f5', 'ebebeb', 'd9d9d9', 'c7c7c7'];

const bars = document.getElementsByClassName('jscolor');
const canvas = document.getElementsByClassName('canvas')[0];
const textElem = document.getElementById('colorText');
const createBtn = document.getElementById('createBtn');
const { auth } = window._colorpk;

let currentBar = bars[0];

const resetColors = () => {
  bars[0].jscolor.fromString(INIT[0]);
  bars[1].jscolor.fromString(INIT[1]);
  bars[2].jscolor.fromString(INIT[2]);
  bars[3].jscolor.fromString(INIT[3]);
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

const validate = val => {
  let isGood = true;
  let dupCnt = 0;

  INIT.forEach((v, k) => {
    if (v === val[k]) {
      dupCnt += 1;
    }
    if (val[k].length !== 6) {
      isGood = false;
    }
  });
  const uniq = val.reduce((acc, v) => {
    if (v in acc) {
      acc[v] += 1;
    } else {
      acc[v] = 1;
    }
    return acc;
  }, {});

  if (dupCnt > 1) {
    isGood = false;
    swal('Oops', 'You need to fill out all columns.', 'error');
  } else if (Object.keys(uniq).length < 4) {
    isGood = false;
    swal('Oops', 'Four unique colors seem a better way', 'error');
  }
  return isGood;
};

createBtn.onclick = () => {
  const state = [].slice.call(bars).map(v => {
    return v.jscolor.toString();
  });

  const isValide = validate(state);
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
          swal('Oops', 'Color duplication detected', 'error');
        } else {
          resetColors();
          publishMsg();
        }
      },
      fail: () => {
        createBtn.disabled = false;
      },
    });
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
    currentBar.style.backgroundColor = `#${vl}`;
    currentBar.jscolor.fromString(vl);
  }
};

for (let i = 0; i < 4; i += 1) {
  bars[i].innerHTML = `<h1 class="${HANDLENAME}">&#8801;</h1>`;
  bars[i].onclick = ({ target }) => {
    currentBar = target;
    textElem.value = target.jscolor.toString();
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

window.dispatchEvent(new Event('_COLORPK_SCRIPT_READY'));
