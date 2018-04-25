import { noop } from '../../shared/util';
const { staticPath } = window._colorpk;

class Box {
  constructor({
                id,
                value,
                like,
                isLiked,
                onLike,
                onRedir,
                onUnlike
              }){
    const me = this;
    me.id = id;
    me.value = value;
    me.like = like;
    me.isLiked = isLiked;
    me.onLike = onLike || noop;
    me.onRedir = onRedir || noop;
    me.onUnlike = onUnlike || noop;

    return me.createDom();
  }
  createDom(){
    const me = this;
    const box = document.createElement("div");
    box.classList.add('box');
    box.dataset.k = me.id;
    box.dataset.l = me.like;

    const cvs = me.createCanvas(),
      btn = me.createBtn();

    box.appendChild(cvs);
    box.appendChild(btn);
    return box;
  }

  createCanvas(){
    const me = this;
    const cvs = document.createElement("div");
    cvs.classList.add('canvas');
    const colors0 = me.value.split('#');
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
        me.onRedir(me.id);
      }
    };

    return cvs;
  }

  createBtn(){
    const me = this;
    const btn = document.createElement("button");
    btn.classList.add('btn');
    btn.setAttribute("type", "button");
    btn.innerHTML = `<img src="${staticPath}${me.isLiked ? 'hrtr.svg' : 'hrt.svg'}">${me.like}`;
    btn.onclick = (v) => {
      if(btn.innerHTML.indexOf('hrt.svg') > -1) {
        const newNum = me.isLiked ? me.like : me.like + 1;
        btn.innerHTML = `<img src="${staticPath}hrtr.svg">${newNum}`;
        me.likeAjax(me.id, 'POST');
        me.addLike(me.id);
        me.onLike(me.id);
      } else {
        const newNum = me.isLiked ? me.like - 1 : me.like;
        btn.innerHTML = `<img src="${staticPath}hrt.svg">${newNum}`;
        me.likeAjax(me.id, 'DELETE');
        me.removeLike(me.id);
        me.onUnlike(me.id);
      }
    };

    return btn;
  }
}

export default Box;