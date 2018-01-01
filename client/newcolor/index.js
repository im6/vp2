import './style.scss';
import './jscolor.min';
import { ajax } from '../shared/util';

const state = [null,null,null,null];
const bars = document.getElementsByClassName('jscolor');

const resetColors = () => {
  for(let i = 0; i < 4; i ++){
    bars[i].jscolor.fromString('ffffff');
  }
};

window.setTextColor = (picker, id) => {
  state[id] = picker.toString();
};

document.getElementById('createBtn').onclick = () => {
  ajax({
    method: 'POST',
    url: `/create`,
    data: {
      color: state,
    },
    success: (v) => {
      debugger;
    },
    fail: () => {
    }
  });
};

document.getElementById('resetBtn').onclick = () => {
  resetColors();
};