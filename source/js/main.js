import 'picturefill';
import 'element-closest-polyfill';
import Nav from './modules/nav';
import Filter from './modules/filter';

function manageNav() {
  const navElem = document.querySelector(`.main-nav`);
  const navToggle = document.querySelector(`.main-nav__toggle`);
  const innerPage = !navElem.classList.contains(`main-nav--index`);

  if (navElem !== null && navToggle !== null && innerPage) {
    const nav = new Nav(navElem, navToggle);
    nav.setup();
  }
}

function manageFilter() {
  const filterElem = document.querySelector(`.filter`);

  if (filterElem !== null) {
    const filter = new Filter(filterElem);
    filter.setup();
  }
}

function work() {
  manageNav();
  manageFilter();
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
