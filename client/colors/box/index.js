const { staticPath } = window._colorpk;
class Box {
  constructor({
                id,
                value,
                like,
                isLiked,
                animDelay,
                onLike,
                onUnlike,
                onRedir,
              }){
    const self = this;
    self.id = id;
    self.value = value;
    self.like = like;
    self.isLiked = isLiked;
    self.animDelay = animDelay;
    self.onLike = onLike;
    self.onUnlike = onUnlike;
    self.onRedir = onRedir;
    const elem = self.createElement();
    return elem;
  }

  createElement(){
    const self = this;
    const box = document.createElement("div");
    box.classList.add('box');
    box.dataset.k = self.id;
    box.dataset.l = self.like;
    box.style.animationDelay = self.animDelay;

    const cvs = document.createElement("div");
    cvs.classList.add('canvas');
    const colors0 = self.value.split('#');
    const colors1 = colors0.map(v => '#' + v);
    colors1.forEach(v => {
      const oneColor = document.createElement("div");
      const oneColorTxt = document.createElement("span");
      oneColorTxt.innerText = v;
      oneColor.appendChild(oneColorTxt);
      oneColor.style.backgroundColor = v;
      oneColor.style.animationDelay = self.animDelay;
      cvs.appendChild(oneColor);
    });

    if(self.onRedir){
      cvs.onclick = (v) => {
        if(v.target.tagName === 'DIV'){
          self.onRedir(self.id);
        }
      };
    }

    const btn = document.createElement("button");
    btn.classList.add('btn');
    btn.setAttribute("type", "button");
    btn.innerHTML = `<img src="${staticPath}${self.isLiked ? 'hrtr.svg' : 'hrt.svg'}">${self.like}`;
    btn.onclick = e => {
      if(btn.innerHTML.indexOf('hrt.svg') > -1) {
        const newNum = self.isLiked ? self.like : self.like + 1;
        btn.innerHTML = `<img src="${staticPath}hrtr.svg">${newNum}`;
        self.onLike(self.id);
      } else {
        const newNum = self.isLiked ? self.like - 1 : self.like;
        btn.innerHTML = `<img src="${staticPath}hrt.svg">${newNum}`;
        self.onUnlike(self.id);
      }
    };

    box.appendChild(cvs);
    box.appendChild(btn);
    return box;
  }
}

export default Box;