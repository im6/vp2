import './style.scss';
import { ajax } from '../shared/util';

const likeAjax = (id) => {
  ajax({
    method: 'POST',
    url: `like/${id}`,
    data: {},
    success: (v) => {
    },
    fail: () => {
    }
  });
};

export const createBox = (id, value, like, isliked) => {
  const newBox = document.createElement("div");
  newBox.classList.add('box');
  newBox.dataset.k = id;
  newBox.dataset.l = like;


  // canvas management
  const newCanvas = document.createElement("div");
  newCanvas.classList.add('canvas');
  const colors0 = value.split('#');
  const colors1 = colors0.map(v => '#' + v);

  colors1.forEach(v => {
    const oneColor = document.createElement("div");
    const oneColorTxt = document.createElement("span");
    oneColorTxt.innerText = v;
    oneColor.appendChild(oneColorTxt);
    oneColor.style.backgroundColor = v;

    newCanvas.appendChild(oneColor);
  });

  // likeBtn management
  const newBtn = document.createElement("button");
  newBtn.classList.add('btn');
  newBtn.setAttribute("type", "button");

  newBtn.innerHTML = `<img src="${isliked ? '/static/hrtr.svg' : '/static/hrt.svg'}">${like}`;

  // bind click event
  newBtn.onclick = (v) => {
    if(newBtn.innerHTML.indexOf('hrt.svg') > -1){
      newBtn.innerHTML = `<img src="/static/hrtr.svg">${like + 1}`;
      likeAjax(id);
    } else {
      newBtn.innerHTML = `<img src="/static/hrt.svg">${like}`;
      // don't call server
    }
  };

  //combine
  newBox.appendChild(newCanvas);
  newBox.appendChild(newBtn);
  return newBox;
};