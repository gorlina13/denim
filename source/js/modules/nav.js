class Nav {
  constructor(navElem, navToggle) {
    this.navElem = navElem;
    this.navToggle = navToggle;
  }

  open() {
    this.navElem.classList.remove(`main-nav--closed`);
    this.navElem.classList.add(`main-nav--opened`);
    this.navToggle.setAttribute(`aria-expanded`, true);
  }

  close() {
    this.navElem.classList.remove(`main-nav--opened`);
    this.navElem.classList.add(`main-nav--closed`);
    this.navToggle.setAttribute(`aria-expanded`, false);
  }

  setup() {
    const onNavToggleClick = () => {
      if (this.navElem.classList.contains(`main-nav--closed`)) {
        this.open();
      } else {
        this.close();
      }
    };

    this.navElem.classList.remove(`main-nav--nojs`);
    this.close();
    this.navToggle.addEventListener(`click`, onNavToggleClick);
  }
}

export default Nav;
