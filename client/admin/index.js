import './style.scss';
import { ajax, noop } from '../shared/util';

const listElem = document.getElementsByClassName('list')[0];
const approve = (id, method) => {
  ajax({
    method,
    url: `/approve/${id}`,
    data: {},
    success: noop,
    fail: noop,
  });

  listElem.removeChild(document.querySelector(`[data-k="${id}"]`));
};

const syncAjax = () => {
  ajax({
    method: 'POST',
    url: `/sync`,
    data: {},
    success: ({ error, data }) => {
      const msg = error ? 'Fail!' : `Success: ${JSON.stringify(data)}`;
      alert(msg); // eslint-disable-line no-alert
    },
    fail: noop,
  });
};

window._colorpk = { // eslint-disable-line no-underscore-dangle
  approve: id => {
    approve(id, 'POST');
  },
  disapprove: id => {
    approve(id, 'DELETE');
  },
  sync: () => {
    syncAjax();
  },
};

window.dispatchEvent(new Event('_COLORPK_SCRIPT_READY'));
