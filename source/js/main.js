import 'picturefill';
import Nav from './modules/nav';

function makeNav() {
  const navElem = document.querySelector(`.main-nav`);
  const navToggle = document.querySelector(`.main-nav__toggle`);
  const innerPage = !navElem.classList.contains(`main-nav--index`);

  if (navElem !== null && navToggle !== null && innerPage) {
    const nav = new Nav(navElem, navToggle);
    nav.setup();
  }
}

function work() {
  makeNav();
}

if (document.readyState === `loading`) {
  document.addEventListener(`DOMContentLoaded`, work);
} else {
  work();
}
