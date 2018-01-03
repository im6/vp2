export const Box = ({id, value, like, isliked, likeFn}) => {
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

  const btn = document.createElement("button");
  btn.classList.add('btn');
  btn.setAttribute("type", "button");
  btn.innerHTML = `<img src="${isliked ? '/static/hrtr.svg' : '/static/hrt.svg'}">${like}`;
  btn.onclick = (v) => {
    if(btn.innerHTML.indexOf('hrt.svg') > -1){
      btn.innerHTML = `<img src="/static/hrtr.svg">${like + 1}`;
      likeFn(id);
    } else {
      btn.innerHTML = `<img src="/static/hrt.svg">${like}`;
      // don't call server
    }
  };

  box.appendChild(cvs);
  box.appendChild(btn);
  return box;
};