import './style.scss';
import './jscolor.min';

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
  debugger;
};

document.getElementById('resetBtn').onclick = () => {
  resetColors();
};