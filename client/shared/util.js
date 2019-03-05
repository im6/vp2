const getCookieLocal = () => {
  let result = {};
  if(!window.cookie || window.cookie.length === 0){
    const cookies0 = document.cookie.split(';');
    result = cookies0.reduce((acc, v, k) => {
      let idx = v.indexOf('=');
      let v1 = v.split(v[idx]);
      acc[v1[0]] = v1[1];
      return acc;
    }, {});
  } else {
    console.error('invalid cookie');
  }

  return result;
};

const clearCookieFromOldVersion = () => {
  if(document.cookie.indexOf('_csrf')> -1){
    document.cookie = '_csrf=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
  }
};

const mobileDetect = () => {
  let isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
  }
  return isMobile;
};


const localCookie = getCookieLocal();

clearCookieFromOldVersion();

export const ajax = (config) => {
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
  xhr.setRequestHeader('X-CSRFToken', localCookie.csrftoken);
  if(method !== 'GET') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  if(Object.keys(data).length){
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
    fail: noop
  });
};

export const isMobile = mobileDetect();
export const noop = () => {};
export const debounce = (fn, wait) => {
  let timeout = null;
  return function(){
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
		timeout = setTimeout(function(){
		  fn.apply(context, args);
    }, wait);
  };
};

export const downloadCanvas = (color) => {
  const HEIGHT = 420,
    WIDTH = 340,
    MARGIN = 13,
    CANVASRATIO = 0.65;

  const colors = color.split('#').map(v => '#'+v);
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
  ctx.fillRect(0,0, WIDTH, HEIGHT * CANVASRATIO + MARGIN * 4);

  ctx.fillStyle = colors[0];
  ctx.fillRect(MARGIN,MARGIN,WIDTH - (MARGIN * 2), boxHts[0]);
  ctx.fillStyle = colors[1];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0],WIDTH - (MARGIN * 2), boxHts[1]);
  ctx.fillStyle = colors[2];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1],WIDTH - (MARGIN * 2), boxHts[2]);
  ctx.fillStyle = colors[3];
  ctx.fillRect(MARGIN,MARGIN + boxHts[0] + boxHts[1] + boxHts[2],WIDTH - (MARGIN * 2), boxHts[3]);

  const colorTxtPosition = CANVASRATIO * HEIGHT + 80,
    space = 17;

  ctx.font = '13px Arial';
  ctx.fillStyle = "#a3a3a3";
  ctx.fillText('ColorPK.com', WIDTH - MARGIN - 78, HEIGHT * 0.74);

  ctx.font = '15px Arial';
  ctx.fillStyle = '#909090';
  ctx.fillText(colors[0], MARGIN, colorTxtPosition);
  ctx.fillText(colors[1], MARGIN, colorTxtPosition + space);
  ctx.fillText(colors[2], MARGIN, colorTxtPosition + space * 2);
  ctx.fillText(colors[3], MARGIN, colorTxtPosition + space * 3);

  const url = myCanvas.toDataURL();
  if('remove' in myCanvas){
    myCanvas.remove();
  }

  return url;

};