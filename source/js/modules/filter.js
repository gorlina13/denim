class Filter {
  constructor(filterElem) {
    this.filterElem = filterElem;
    this.mainToggleSelector = `.filter__toggle`;
    this.toggleSelector = `.filter-form__toggle`;
    this.closeSelector = `.filter-form__close`;
  }

  changeElemState(elem, classToRemove, classToAdd, toggle, expanded) {
    elem.classList.remove(classToRemove);
    elem.classList.add(classToAdd);
    toggle.setAttribute(`aria-expanded`, expanded);
  }

  closeFilter() {
    this.changeElemState(this.filterElem, `filter--opened`, `filter--closed`, this.mainToggle, false);
  }

  openFilter() {
    this.changeElemState(this.filterElem, `filter--closed`, `filter--opened`, this.mainToggle, true);
  }

  closeContainer(toggle) {
    this.changeElemState(toggle.parentElement, `filter-form__subtitle--expanded-true`, `filter-form__subtitle--expanded-false`, toggle, false);
  }

  openContainer(toggle) {
    this.changeElemState(toggle.parentElement, `filter-form__subtitle--expanded-false`, `filter-form__subtitle--expanded-true`, toggle, true);
  }

  replaceWithButton(selector) {
    const elems = document.querySelectorAll(selector);
    elems.forEach((elem) => {
      const button = document.createElement(`button`);
      button.innerHTML = elem.innerHTML;
      button.className = elem.className;
      button.setAttribute(`type`, `button`);
      elem.parentElement.replaceChild(button, elem);
    });
  }

  onFilterClick(evt) {
    const mainToggle = evt.target.closest(this.mainToggleSelector);
    const toggle = evt.target.closest(this.toggleSelector);
    const close = evt.target.closest(this.closeSelector);

    const onMainToggleClick = () => {
      if (this.filterElem.classList.contains(`filter--closed`)) {
        this.openFilter();
      } else {
        this.closeFilter();
      }
    };

    const onContainerToggleClick = (toggle) => {
      if (toggle.getAttribute(`aria-expanded`) === `false`) {
        this.openContainer(toggle);
      } else {
        this.closeContainer(toggle);
      }
    };

    const onCloseClick = () => {
      this.closeFilter();
    };

    if (mainToggle) {
      onMainToggleClick();
    }

    if (toggle) {
      onContainerToggleClick(toggle);
    }

    if (close) {
      onCloseClick();
    }
  }

  setup() {
    this.filterElem.classList.remove(`filter--nojs`);
    this.replaceWithButton(this.mainToggleSelector);
    this.mainToggle = this.filterElem.querySelector(this.mainToggleSelector);
    this.closeFilter();

    this.replaceWithButton(this.toggleSelector);
    this.toggles = this.filterElem.querySelectorAll(this.toggleSelector);
    this.toggles.forEach((item) => {
      this.closeContainer(item);
    });

    this.filterElem.addEventListener(`click`, this.onFilterClick.bind(this));
  }
}

export default Filter;
