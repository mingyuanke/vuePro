const SliderTypes = new Set(['V', 'H']);
let SliderEvents = new Map();
let startKey = ('ontouchstart' in document) ? 'touchstart' : 'mousedown';
let moveKey = ('ontouchmove' in document) ? 'touchmove' : 'mousemove';
let endKey = ('ontouchend' in document) ? 'touchend' : 'mouseup';
let leaveKey = ('ontouchleave' in document) ? 'touchleave' : 'mouseout';
let cancelKey = ('ontouchcancel' in document) ? 'touchcancel' : 'mousecancel';
/**
 * 获取点触时坐标位置:1.pc端:event.clientX,event.clientY 2.移动端event.touches
 * @param event
 */
function getPosition(event) {
  if (event.clientX && event.clientY) {
    return {
      X: event.clientX,
      Y: event.clientY
    }
  } else if (event.touches && event.touches.length === 1) {
    return {
      X: event.touches[0].clientX,
      Y: event.touches[0].clientY
    }
  }
  else {
    return {
      X: 0,
      Y: 0
    }
  }

}
function touchStart(event) {
  //window.console.log(event);
  window.VSlider.isTouched = true;
  window.VSlider.isSlider = false;
  let position = getPosition(event);
  window.VSlider.preTouchPosition = {
    x: position.X,
    y: position.Y,
    touchTime: new Date().getTime()
  };
  window.VSlider.currSliderDom = null;
  window.VSlider.speed = 0;
  window.VSlider.distance = 0;
  window.VSlider.currTouchDom = event.target
}
function touchMove(event) {
  let position = getPosition(event);
  if (window.VSlider && (!window.VSlider.isTouched)) {
    return false
  }
  if (!window.VSlider.currTouchDom) {
    return false
  }
  if (!window.VSlider.isSlider) {
    let diffX = position.X - window.VSlider.preTouchPosition.x;
    let diffY = position.Y - window.VSlider.preTouchPosition.y;
    let type = '';
    let max = '';
    if (Math.abs(diffX) > Math.abs(diffY)) {
      max = Math.abs(diffX);
      type = 'H'
    } else {
      max = Math.abs(diffY);
      type = 'V'
    }
    if (max > 5) {
      let currDom = window.VSlider.currTouchDom;
      while (currDom && (currDom !== document.body)) {
        let reachDom = window.VSlider.SliderDoms.find(function (value) {
          return value.dom === currDom && value.opts.sliderType === type
        });
        if (reachDom) {
          window.VSlider.isSlider = true;
          window.VSlider.currSliderDom = reachDom;
          window.VSlider.currSliderDom.opts.beforeSlide();
          break;
        }
        if (currDom && currDom.parentNode) {
          currDom = currDom.parentNode
        } else {
          window.VSlider.isTouched = false;
          return false
        }

      }
    } else {
      return false
    }
    if (!window.VSlider.isSlider) {
      window.VSlider.isTouched = false;
      return false
    }
  }
  let diff = 0;
  switch (window.VSlider.currSliderDom.opts.sliderType) {
    case "H":
      diff = position.X - window.VSlider.preTouchPosition.x;
      break;
    case "V":
      diff = position.Y - window.VSlider.preTouchPosition.y;
      break;
  }
  let newTime = new Date().getTime();
  window.VSlider.speed = diff * 1000 / (newTime - window.VSlider.preTouchPosition.touchTime);
  if (Math.abs(diff) < 3) {
    return false
  }
  window.VSlider.preTouchPosition = {
    x: position.X,
    y: position.Y,
    touchTime: newTime
  };
  window.VSlider.distance += diff;
  window.VSlider.currSliderDom.opts.sliding({
    dis: window.VSlider.distance,
    mDis: diff
  })
}
function touchEnd(event) {
  if (!window.VSlider.currSliderDom) {
    return false
  }
  window.VSlider.currSliderDom.opts.afterSlide({
    dis: window.VSlider.distance,
    speed: window.VSlider.speed
  });
  window.VSlider.isTouched = false;
  window.VSlider.isSlider = false;
  window.VSlider.preTouchPosition = {
    x: 0,
    y: 0,
    touchTime: new Date().getTime()
  };
  window.VSlider.currSliderDom = null;
  window.VSlider.speed = 0;
  window.VSlider.distance = 0;
  window.VSlider.currTouchDom = null
}
function touchLeave(event) {
  if (event.target === document.body) {
    console.log(event);
  }
}

SliderEvents.set(startKey, touchStart);
SliderEvents.set(moveKey, touchMove);
SliderEvents.set(endKey, touchEnd);
SliderEvents.set(leaveKey, touchLeave);
SliderEvents.set(cancelKey, touchLeave);
class VueSlider {
  constructor() {
    this.SliderDoms = [];
    this.isTouched = false;
    this.isSlider = false;
    this.speed = 0;
    this.distance = 0;
    this.preTouchPosition = {
      x: 0,
      y: 0,
      touchTime: new Date().getTime()
    };
    this.currSliderDom = null;
    this.currTouchDom = null;
    SliderEvents.forEach(function (value, key) {
      document.body.addEventListener(key, value)
    })
  }

  addSlider(el, opts) {
    let defOpts = {
      sliderType: 'V',
      beforeSlide(){

      },
      sliding(){

      },
      afterSlide(){

      }
    };
    if (opts.sliderType && !SliderTypes.has(opts.sliderType)) {
      opts.sliderType = 'V'
    }
    this.SliderDoms.push({
      dom: el,
      opts: Object.assign({}, defOpts, opts)
    })
  }
}
let VSlider;
if (!window.VSlider) {
  window.VSlider = new VueSlider()
}
VSlider = window.VSlider;
export default VSlider
