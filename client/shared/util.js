const csrfToken = document
  .querySelector('[name=csrfmiddlewaretoken]')
  .getAttribute('value');
const clearCookieFromOldVersion = () => {
  if (document.cookie.indexOf('_csrf') > -1) {
    document.cookie = '_csrf=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
  }
};
export const noop = () => { };
clearCookieFromOldVersion();

const checkLocalStorage = () => {
  const textKey = '_tls';
  try {
    window.localStorage.setItem(textKey, '1');
    window.localStorage.getItem(textKey);
    window.localStorage.removeItem(textKey);
    return true;
  } catch (e) {
    return false;
  }
};
export const localStorageEnabled = checkLocalStorage();
export const ajax = config => {
  const { method, url, data, success, fail } = config;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      } else {
        fail();
      }
    }
  };

  xhr.open(method, url);
  xhr.setRequestHeader('X-CSRFToken', csrfToken);
  if (method !== 'GET') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  if (data && Object.keys(data).length) {
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
};

export const likeAjax = (id, method) => {
  ajax({
    method,
    url: `/like/${id}`,
    success: noop,
    fail: noop,
  });
};

export const debounce = (fn, wait) => {
  let timeout = null;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};

export const downloadCanvas = color => {
  const HEIGHT = 420;
  const WIDTH = 340;
  const MARGIN = 13;
  const CANVASRATIO = 0.65;

  const colors = color.split('#').map(v => `#${v}`);
  const myCanvas = document.createElement('canvas');
  const ctx = myCanvas.getContext('2d');

  myCanvas.width = WIDTH;
  myCanvas.height = HEIGHT;
  myCanvas.style.border = '1px solid #c1c1c1';

  const boxHts = [
    HEIGHT * CANVASRATIO * 0.4,
    HEIGHT * CANVASRATIO * 0.25,
    HEIGHT * CANVASRATIO * 0.175,
    HEIGHT * CANVASRATIO * 0.175,
  ];

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT * CANVASRATIO + MARGIN * 4);

  ctx.fillStyle = colors[0]; // eslint-disable-line prefer-destructuring
  ctx.fillRect(MARGIN, MARGIN, WIDTH - MARGIN * 2, boxHts[0]);
  ctx.fillStyle = colors[1]; // eslint-disable-line prefer-destructuring
  ctx.fillRect(MARGIN, MARGIN + boxHts[0], WIDTH - MARGIN * 2, boxHts[1]);
  ctx.fillStyle = colors[2]; // eslint-disable-line prefer-destructuring
  ctx.fillRect(
    MARGIN,
    MARGIN + boxHts[0] + boxHts[1],
    WIDTH - MARGIN * 2,
    boxHts[2]
  );
  ctx.fillStyle = colors[3]; // eslint-disable-line prefer-destructuring
  ctx.fillRect(
    MARGIN,
    MARGIN + boxHts[0] + boxHts[1] + boxHts[2],
    WIDTH - MARGIN * 2,
    boxHts[3]
  );

  const colorTxtPosition = CANVASRATIO * HEIGHT + 80;
  const space = 17;

  ctx.font = '13px Arial';
  ctx.fillStyle = '#a3a3a3';
  ctx.fillText('ColorPK.com', WIDTH - MARGIN - 78, HEIGHT * 0.74);

  ctx.font = '15px Arial';
  ctx.fillStyle = '#909090';
  for (let i = 0; i < 4; i += 1) {
    ctx.fillText(colors[i], MARGIN, colorTxtPosition + space * i);
  }
  const url = myCanvas.toDataURL();
  if (typeof myCanvas.remove === 'function') myCanvas.remove();
  return url;
};
