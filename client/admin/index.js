import './style.scss';
import { ajax, noop } from '../shared/util';

const approve = (id, method) => {
  ajax({
    method,
    url: `/approve/${id}`,
    data: {},
    success: noop,
    fail: noop
  });
};


window._colorpk = {
  approve: id => {
    approve(id, 'POST');
  },
  disapprove: id => {
    approve(id, 'DELETE');
  },
};