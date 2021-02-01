import 'picturefill';
import 'element-closest-polyfill';
import Nav from './modules/nav';
import Slider from './modules/slider';

function init(selector, Component) {
  const initNav = () => {
    const navElem = document.querySelector(selector);
    const navToggle = (navElem === null) ? null : navElem.querySelector(`button`);

    if (navToggle !== null) {
      const nav = new Component(navElem, navToggle);
      nav.init();
    }
  };

  const initInstances = () => {
    const elems = document.querySelectorAll(selector);
    if (elems.length > 0) {
      elems.forEach((item) => {
        const instance = new Component(item);
        instance.init();
      });
    }
  };

  const name = Component.prototype.constructor.name;

  switch (name) {
    case `Nav`:
      initNav();
      break;

    default:
      initInstances();
      break;
  }
}

function work() {
  init(`.main-nav`, Nav);
  init(`.range__thumb`, Slider);
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
