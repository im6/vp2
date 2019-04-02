const MAXNUM = 6;

class LayoutManager {
  constructor() {
    this.sizeInfo = null;
  }

  set windowWidth(wiw) {
    const [boxWidth, boxMargin] = this.boxSize(wiw);
    const util = this.widthUtility(wiw);
    
    const wd = Math.floor(wiw * util/boxWidth) * boxWidth;
    const maxTotal = boxWidth * MAXNUM;
    const doubleMargin = boxMargin * 2;

    this.sizeInfo = {
      containerWidth: `${wd}px`,
      containerWidthMax: `${maxTotal}px`,
      helperWidth: `${wd - doubleMargin}px`,
      helperWidthMax: `${maxTotal - doubleMargin}px`,
    };
  }

  boxSize(wiw) {
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
    return [width, margin];
  }

  widthUtility(wiw){
    return wiw > 692 ? 0.9 : 0.99;
  }
}

export default LayoutManager;