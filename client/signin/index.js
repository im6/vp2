import './style.scss';
import { ajax } from '../shared/util';

ajax({
    method: 'GET',
    url: `/url`,
    data: {},
    success: ({gg, fb, wb}) => {
      const elems = document.querySelectorAll('#signin-box a');
      elems[0].href = wb;
      elems[1].href = fb;
      elems[2].href = gg;
    },
    fail: () => {
    }
  });
