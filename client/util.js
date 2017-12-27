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
  if(method !== 'GET') {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  xhr.send(JSON.stringify(data));
};