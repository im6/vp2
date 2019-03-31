const MAXNUM = 6;

class LayoutManager {
  constructor(wiw) {
    this.wiw = wiw;
  }
  get boxSize() {
    const { wiw } = this;
    let width, margin;
    if(wiw < 321){
      margin = 4;
      width = 125 + (6 + margin) * 2;
    } else if(wiw < 769){
      margin = 4;
      width = 150 + (6 + margin) * 2;
    } else {
      margin = 10;
      width = 220 + (7 + margin) * 2; //wide screen
    }
    return {
      width,
      margin,
    };
  }

  get widthUtility(){
    return this.wiw > 667 ? 0.9 : 0.99;
  }

  get containerWidth(){
    const { wiw } = this;
    const { width, margin } = this.boxSize;
    const wd = Math.floor(wiw * this.widthUtility/width) * width;
    const maxTotal = width * MAXNUM;
    const doubleMargin = margin * 2;
    return {
      width: `${wd}px`,
      maxWidth: `${maxTotal}px`,
      helpWidth: `${wd - doubleMargin}px`,
      helpMaxWidth: `${maxTotal - doubleMargin}px`
    };
  }

  updateWinWidth(newWiw) {
    this.wiw = newWiw;
  }
}

export default LayoutManager;