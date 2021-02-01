import * as check from './util/checkKey.js';

class Slider {
  constructor(elem) {
    this.elem = elem;
    this.railElem = this.elem.parentElement;

    this.labelElem = false;
    this.minThumbElem = false;
    this.maxThumbElem = false;

    this.valueNow = 50;
    this.railMin = 0;
    this.railMax = 100;

    /*
    it cannot use 'this.railElem.clientWidth' etc.
    when the slider node is contained in a 'details:not([open])' node
    */
    this.railWidth = parseFloat(getComputedStyle(this.railElem).width);
    this.railBorderWidth = parseFloat(getComputedStyle(this.railElem).borderLeftWidth);
    this.thumbWidth = parseFloat(getComputedStyle(this.elem).width);
  }

  init() {
    if (this.elem.previousElementSibling) {
      this.labelElem = this.elem.parentElement.nextElementSibling;
      this.minThumbElem = this.elem.previousElementSibling;
      this.railMin = parseInt(this.minThumbElem.getAttribute(`aria-valuemin`), 10);
    } else {
      this.railMin = parseInt(this.elem.getAttribute(`aria-valuemin`), 10);
    }

    if (this.elem.nextElementSibling) {
      this.labelElem = this.elem.parentElement.previousElementSibling;
      this.maxThumbElem = this.elem.nextElementSibling;
      this.railMax = parseInt(this.maxThumbElem.getAttribute(`aria-valuemax`), 10);
    } else {
      this.railMax = parseInt(this.elem.getAttribute(`aria-valuemax`), 10);
    }

    this.valueNow = parseInt(this.elem.getAttribute(`aria-valuenow`), 10);

    this.elem.removeAttribute(`aria-disabled`);

    if (this.elem.tabIndex !== 0) {
      this.elem.tabIndex = 0;
    }

    this.elem.addEventListener(`keydown`, this.onSliderKeydown.bind(this));
    this.elem.addEventListener(`mousedown`, this.onSliderMousedown.bind(this));
    this.elem.addEventListener(`focus`, this.onSliderFocus.bind(this));
    this.elem.addEventListener(`blur`, this.onSliderBlur.bind(this));

    this.moveSliderTo(this.valueNow);
  }

  moveSliderTo(value) {
    const valueMax = parseInt(this.elem.getAttribute(`aria-valuemax`), 10);
    const valueMin = parseInt(this.elem.getAttribute(`aria-valuemin`), 10);

    if (value > valueMax) {
      value = valueMax;
    }

    if (value < valueMin) {
      value = valueMin;
    }

    this.valueNow = value;
    this.dolValueNow = `$` + value;
    this.elem.setAttribute(`aria-valuenow`, this.valueNow);
    this.elem.setAttribute(`aria-valuetext`, this.dolValueNow);

    if (this.minThumbElem) {
      this.minThumbElem.setAttribute(`aria-valuemax`, this.valueNow);
    }

    if (this.maxThumbElem) {
      this.maxThumbElem.setAttribute(`aria-valuemin`, this.valueNow);
    }

    const pos = Math.round(((this.valueNow - this.railMin) * (this.railWidth - 2 * (this.thumbWidth - this.railBorderWidth))) / (this.railMax - this.railMin));

    let posLeft;

    if (this.minThumbElem) {
      posLeft = pos + this.thumbWidth - this.railBorderWidth;
    } else {
      posLeft = pos - this.railBorderWidth;
    }

    this.elem.style.left = posLeft / this.railWidth * 100 + `%`;

    if (this.labelElem) {
      this.labelElem.innerHTML = this.dolValueNow;
    }
  }

  onSliderKeydown(evt) {
    const truthy = true;
    const handleKeydown = (targetValue) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.moveSliderTo(targetValue);
    };

    switch (truthy) {
      case check.arrowLeft(evt):
      case check.arrowDown(evt):
        handleKeydown(this.valueNow - 1);
        break;

      case check.arrowRight(evt):
      case check.arrowUp(evt):
        handleKeydown(this.valueNow + 1);
        break;

      case check.pageDown(evt):
        handleKeydown(this.valueNow - 10);
        break;

      case check.pageUp(evt):
        handleKeydown(this.valueNow + 10);
        break;

      case check.home(evt):
        handleKeydown(this.railMin);
        break;

      case check.end(evt):
        handleKeydown(this.railMax);
        break;

      default:
        break;
    }
  }

  onSliderFocus() {
    this.elem.classList.add(`range__thumb--focus`);
    this.railElem.classList.add(`range__rail--focus`);
  }

  onSliderBlur() {
    this.elem.classList.remove(`range__thumb--focus`);
    this.railElem.classList.remove(`range__rail--focus`);
  }

  onSliderMousedown(evt) {
    const onSliderMousemove = () => {
      evt.preventDefault();
      evt.stopPropagation();

      const diffX = evt.pageX - this.railElem.offsetLeft;
      this.valueNow = this.railMin + parseInt(((this.railMax - this.railMin) * diffX) / this.railWidth, 10);
      this.moveSliderTo(this.valueNow);
    };

    const onSliderMouseup = () => {
      document.removeEventListener(`mousemove`, onSliderMousemove);
      document.removeEventListener(`mouseup`, onSliderMouseup);
    };

    evt.preventDefault();
    evt.stopPropagation();
    document.addEventListener(`mousemove`, onSliderMousemove);
    document.addEventListener(`mouseup`, onSliderMouseup);
    this.elem.focus();
  }
}

export default Slider;
