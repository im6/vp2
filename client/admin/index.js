import './style.scss';
import { ajax, noop } from '../shared/util';

const listElem = document.getElementsByClassName('list')[0];
const approve = (id, method) => {
  ajax({
    method,
    url: `/approve/${id}`,
    data: {},
    success: noop,
    fail: noop
  });

  let tgt = document.querySelector(`[data-k="${id}"]`);
  listElem.removeChild(tgt);
};


window._colorpk = {
  approve: id => {
    approve(id, 'POST');
  },
  disapprove: id => {
    approve(id, 'DELETE');
  },
};