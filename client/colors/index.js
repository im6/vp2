import './style.scss';

const boxes = document.getElementsByClassName('box');
for(let i = 0; i < boxes.length; i ++){
  let button = boxes[i];
  let id = button.attributes.getNamedItem('data-k').value;
  button.getElementsByTagName('button')[0].onclick = (v) => {
    let imgElem = button.getElementsByTagName('img')[0];
    let txtElem = button.getElementsByTagName('span')[0];
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