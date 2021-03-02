import {esc} from './util/checkKey.js';

class DetailsDropdown {
  constructor(elem) {
    this.elem = elem;
    this.elems = document.querySelectorAll(`.details-dropdown`);
    this.summary = elem.querySelector(`summary`);
    this.closeButton = elem.querySelector(`.details-dropdown__close`);
  }

  init() {
    this.elem.classList.remove(`details-dropdown--nojs`);
    this.elem.addEventListener(`toggle`, this.onDetailsToggle.bind(this));
    if (this.closeButton !== null) {
      this.closeButton.addEventListener(`click`, this.onCloseButtonClick.bind(this));
    }
    this.elem.addEventListener(`focusout`, this.onDetailsFocusout.bind(this));
    this.elem.addEventListener(`keydown`, this.onDetailsKeydown.bind(this));
  }

  onDetailsToggle(evt) {
    const onDetailsOpen = () => {
      const withButton = this.closeButton !== null && this.closeButton.offsetWidth !== 0;
      /*
      Might be:
      const withButton = this.closeButton?.offsetWidth;
      */

      this.elems.forEach((item) => {
        if (item !== evt.target && item.open) {
          item.open = false;
        }
      });

      if (withButton) {
        this.summary.nextElementSibling.scrollIntoView(top);
      }
    };

    if (this.elem.open) {
      onDetailsOpen();
    }
  }

  onCloseButtonClick(evt) {
    evt.preventDefault();
    this.elem.open = false;
    this.summary.focus();
  }

  onDetailsFocusout(evt) {
    const focus = evt.relatedTarget !== null;
    const containsFocus = this.elem.contains(evt.relatedTarget);

    if (focus && !containsFocus) {
      this.elem.open = false;
    }
  }

  onDetailsKeydown(evt) {
    if (esc(evt)) {
      this.elem.open = false;
      this.summary.focus();
    }
  }
}

export default DetailsDropdown;
