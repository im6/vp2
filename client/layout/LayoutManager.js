const MAXNUM = 6;
let instance = null;

class LayoutManager {
  // singleton
  constructor() {
    if (!instance) {
      this.sizeInfo = null;
      instance = this;
    }
    return instance;
  }

  set windowWidth(wiw) {
    const [boxWidth, boxMargin] = LayoutManager.boxSize(wiw);
    const util = LayoutManager.widthUtility(wiw);

    const wd = Math.floor((wiw * util) / boxWidth) * boxWidth;
    const maxTotal = boxWidth * MAXNUM;
    const doubleMargin = boxMargin * 2;

    this.sizeInfo = {
      containerWidth: `${wd}px`,
      containerWidthMax: `${maxTotal}px`,
      helperWidth: `${wd - doubleMargin}px`,
      helperWidthMax: `${maxTotal - doubleMargin}px`,
    };
  }

  static widthUtility(wiw) {
    return wiw > 692 ? 0.9 : 0.99;
  }

  static boxSize(wiw) {
    // Borders and padding are not included in the width calculation.
    let width;
    let margin;
    if (wiw < 321) {
      margin = 4;
      width = 125 + margin * 2;
    } else if (wiw < 769) {
      margin = 4;
      width = 150 + margin * 2;
    } else {
      // wide screen
      margin = 10;
      width = 220 + margin * 2;
    }
    return [width, margin];
  }
}

export default LayoutManager;
