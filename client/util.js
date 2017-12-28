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

const localCookie = getCookieLocal();


export const ajax = (config) => {
  const { method, url, data, success, fail } = config;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        success(xhr.responseText);
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
  xhr.send(JSON.stringify(data));
};