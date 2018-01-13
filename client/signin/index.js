import './style.scss';
import { ajax } from '../shared/util';

ajax({
    method: 'GET',
    url: `/url`,
    data: {},
    success: ({gg, fb, wb}) => {
      const elems = document.getElementsByTagName('a');
      elems[3].href = wb;
      elems[4].href = fb;
      elems[5].href = gg;
    },
    fail: () => {
    }
  });
