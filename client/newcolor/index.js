import './style.scss';
import './jscolor.min';
import { ajax } from '../shared/util';

const bars = document.getElementsByClassName('jscolor');
let state = [null,null,null,null];

const resetColors = () => {
  for(let i = 0; i < 4; i ++){
    bars[i].jscolor.fromString('ffffff');
  }
  state = [null,null,null,null];
};

window.setTextColor = (picker, id) => {
  state[id] = picker.toString();
};

document.getElementById('createBtn').onclick = () => {
  if(state.indexOf(null) > -1){
    // not valid color here
  } else {
    ajax({
      method: 'POST',
      url: `/create`,
      data: {
        color: state,
      },
      success: (v) => {
        debugger;
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