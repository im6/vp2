import './style.scss';

const BOXWD = 260;

// const boxes = document.getElementsByClassName('box');
// for(let i = 0; i < boxes.length; i ++){
//   let thisBox = boxes[i];
//   let id = thisBox.attributes.getNamedItem('data-k').value;
//   thisBox.getElementsByTagName('button')[0].onclick = (v) => {
//     let imgElem = thisBox.getElementsByTagName('img')[0];
//     let txtElem = thisBox.getElementsByTagName('span')[4];
//
//     let likeNum = parseInt(txtElem.innerText);
//     if(imgElem.src.indexOf('hrt.svg') > -1){
//       imgElem.src = imgElem.src.replace('hrt.svg', 'hrtr.svg');
//       txtElem.innerText = likeNum + 1;
//     } else {
//       imgElem.src = imgElem.src.replace('hrtr.svg', 'hrt.svg');
//       txtElem.innerText = likeNum - 1;
//     }
//   }
// }

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
    } else {
      likeImg.src = likeImg.src.replace('hrtr.svg', 'hrt.svg');
      likeTxt.innerText = like;
    }
  };


  //combine
  newBox.appendChild(newCanvas);
  newBox.appendChild(newBtn);
  return newBox;
};


export const calcMainBoxWidth = (w) => {
 let num = Math.floor(w * 0.9/BOXWD);
 return num * BOXWD;
};