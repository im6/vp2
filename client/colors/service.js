import './style.scss';
import { ajax } from '../util';

const likeAjax = (id, like) => {
  ajax({
    method: 'POST',
    url: `like/${id}`,
    data: {
      like,
    },
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
  newBtn.setAttribute("type", "button");

  const likeTxt = document.createElement("span");
  likeTxt.innerText = like;
  const likeImg = document.createElement("img");
  likeImg.src = isliked ? '/static/hrtr.svg' : '/static/hrt.svg';

  newBtn.appendChild(likeImg);
  newBtn.appendChild(likeTxt);

  // bind click event
  newBtn.onclick = (v) => {
    if(likeImg.src.indexOf('hrt.svg') > -1){
      likeImg.src = likeImg.src.replace('hrt.svg', 'hrtr.svg');
      likeTxt.innerText = like + 1;
      likeAjax(id, true);
    } else {
      likeImg.src = likeImg.src.replace('hrtr.svg', 'hrt.svg');
      likeTxt.innerText = like;
      likeAjax(id, false);
    }
  };


  //combine
  newBox.appendChild(newCanvas);
  newBox.appendChild(newBtn);
  return newBox;
};