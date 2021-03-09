import {esc} from './util/checkKey';
import {forbidScrolling, allowScrolling} from './util/scrolling';

class DetailsDropdown {
  constructor(elem) {
    this.elem = elem;
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

  onDetailsToggle() {
    const onDetailsOpen = () => {
      const withButton = this.closeButton !== null && this.closeButton.offsetWidth !== 0;
      /*
      Might be:
      const withButton = this.closeButton?.offsetWidth;
      */

      if (withButton) {
        forbidScrolling();
        this.scrollingIsForbidden = true;
      }
    };

    const onDetailsClose = () => {
      if (this.scrollingIsForbidden) {
        allowScrolling();
        this.scrollingIsForbidden = false;
      }
    };

    const handler = this.elem.open ? onDetailsOpen : onDetailsClose;

    handler();
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
