import './style.scss';
import { ajax } from '../shared/util';

ajax({
    method: 'GET',
    url: `/url`,
    data: {},
    success: ({gg, fb, wb, gh}) => {
      const elems = document.querySelectorAll('#signin-box a');
      elems[0].href = wb;
      elems[1].href = gh;
      elems[2].href = gg;
      elems[3].href = fb;

      elems[0].style.display = 'inline-block';
      elems[1].style.display = 'inline-block';
      elems[2].style.display = 'inline-block';
      elems[3].style.display = 'inline-block';
    },
    fail: () => {
    }
  });
