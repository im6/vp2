import './style.scss';

const boxes = document.getElementsByClassName('box');
for(let i = 0; i < boxes.length; i ++){
  let thisBox = boxes[i];
  let id = thisBox.attributes.getNamedItem('data-k').value;
  thisBox.getElementsByTagName('button')[0].onclick = (v) => {
    let imgElem = thisBox.getElementsByTagName('img')[0];
    let txtElem = thisBox.getElementsByTagName('span')[4];

    let likeNum = parseInt(txtElem.innerText);
    if(imgElem.src.indexOf('hrt.svg') > -1){
      imgElem.src = imgElem.src.replace('hrt.svg', 'hrtr.svg');
      txtElem.innerText = likeNum + 1;
    } else {
      imgElem.src = imgElem.src.replace('hrtr.svg', 'hrt.svg');
      txtElem.innerText = likeNum - 1;
    }
  }
}