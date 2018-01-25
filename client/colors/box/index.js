import { noop, ajax } from '../../shared/util';

const likeAjax = (id, method) => {
  ajax({
    method,
    url: `/like/${id}`,
    data: {},
    success: noop,
    fail: noop
  });
};

export const Box = (vm) => {
  const { id, value, like, isLiked } = vm;
  let { onLike, onRedir, onUnlike } = vm;

  onUnlike = onUnlike || noop;
  onLike = onLike || noop;
  onRedir = onRedir || noop;

  const box = document.createElement("div");
  box.classList.add('box');
  box.dataset.k = id;
  box.dataset.l = like;

  const cvs = document.createElement("div");
  cvs.classList.add('canvas');
  const colors0 = value.split('#');
  const colors1 = colors0.map(v => '#' + v);
  colors1.forEach(v => {
    const oneColor = document.createElement("div");
    const oneColorTxt = document.createElement("span");
    oneColorTxt.innerText = v;
    oneColor.appendChild(oneColorTxt);
    oneColor.style.backgroundColor = v;
    cvs.appendChild(oneColor);
  });
  cvs.onclick = (v) => {
    if(v.target.tagName === 'DIV'){
      onRedir(id);
    }
  };

  const btn = document.createElement("button");
  btn.classList.add('btn');
  btn.setAttribute("type", "button");
  btn.innerHTML = `<img src="${isLiked ? '/static/hrtr.svg' : '/static/hrt.svg'}">${like}`;
  btn.onclick = (v) => {
    if(btn.innerHTML.indexOf('hrt.svg') > -1) {
      btn.innerHTML = `<img src="/static/hrtr.svg">${like + 1}`;
      likeAjax(id, 'POST');
      onLike(id);
    } else {
      btn.innerHTML = `<img src="/static/hrt.svg">${like}`;
      likeAjax(id, 'DELETE');
      onUnlike(id);
    }
  };

  box.appendChild(cvs);
  box.appendChild(btn);
  return box;
};