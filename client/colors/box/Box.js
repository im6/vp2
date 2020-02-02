const { _colorpk: { staticPath } } = window;

class Box {
  constructor({
    id,
    color,
    like,
    isLiked,
    animDelay,
    onLike,
    onUnlike,
    onRedir,
  }) {
    this.id = id;
    this.color = color;
    this.like = like;
    this.isLiked = isLiked;
    this.animDelay = animDelay;
    this.onLike = onLike;
    this.onUnlike = onUnlike;
    this.onRedir = onRedir;
    const elem = this.createElement();
    return elem;
  }

  createElement() {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.k = this.id;
    box.dataset.l = this.like;
    box.style.animationDelay = this.animDelay;

    const cvs = document.createElement('div');
    cvs.classList.add('canvas');
    const colors0 = this.color.split('#');
    const colors1 = colors0.map(v => `#${v}`);
    colors1.forEach(v => {
      const oneColor = document.createElement('div');
      const oneColorTxt = document.createElement('span');
      oneColorTxt.innerText = v;
      oneColor.appendChild(oneColorTxt);
      oneColor.style.backgroundColor = v;
      oneColor.style.animationDelay = this.animDelay;
      cvs.appendChild(oneColor);
    });

    if (this.onRedir) {
      cvs.onclick = v => {
        if (v.target.tagName === 'DIV') {
          this.onRedir(this.id);
        }
      };
    }

    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.setAttribute('type', 'button');
    btn.innerHTML = `<img src="${staticPath}${
      this.isLiked ? 'hrtr.svg' : 'hrt.svg'
      }">${this.like}`;
    btn.onclick = () => {
      if (btn.innerHTML.indexOf('hrt.svg') > -1) {
        const newNum = this.isLiked ? this.like : this.like + 1;
        btn.innerHTML = `<img src="${staticPath}hrtr.svg">${newNum}`;
        this.onLike(this.id);
      } else {
        const newNum = this.isLiked ? this.like - 1 : this.like;
        btn.innerHTML = `<img src="${staticPath}hrt.svg">${newNum}`;
        this.onUnlike(this.id);
      }
    };

    box.appendChild(cvs);
    box.appendChild(btn);
    return box;
  }
}

export default Box;
