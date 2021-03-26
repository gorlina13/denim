import {esc} from './util/checkKey';

class DetailsDropdown {
  constructor(elem) {
    this.elem = elem;
    this.summary = elem.querySelector(`summary`);
    this.closeButton = elem.querySelector(`.details-dropdown__close`);
    this.FOCUSABLE_ELEMS_SELECTOR = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]`;
    this.firstTabStop = this.summary.nextElementSibling.querySelectorAll(this.FOCUSABLE_ELEMS_SELECTOR)[0];
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
      /*
      Might be:
      const contentCoversSummary = this.closeButton?.offsetWidth;
      */
      const contentCoversSummary = this.closeButton !== null && this.closeButton.offsetWidth !== 0;

      if (contentCoversSummary) {
        this.firstTabStop.focus();
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
