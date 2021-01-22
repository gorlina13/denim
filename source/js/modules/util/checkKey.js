const checkKey = (evt, keyString) => {
  const TAB_KEYCODE = 9;
  const ESC_KEYCODE = 27;
  const SPACE_KEYCODE = 32;
  const ENTER_KEYCODE = 13;
  const ARROW_RIGHT_KEYCODE = 39;
  const ARROW_LEFT_KEYCODE = 37;
  const ARROW_DOWN_KEYCODE = 40;
  const ARROW_UP_KEYCODE = 38;
  const PAGE_UP_KEYCODE = 33;
  const PAGE_DOWN_KEYCODE = 34;
  const END_KEYCODE = 35;
  const HOME_KEYCODE = 36;

  const key = evt.key || evt.keyCode;
  const сheck = key === keyString;
  let extraCheck;

  switch (keyString) {
    case `Tab`:
      extraCheck = key === TAB_KEYCODE;
      break;

    case `Escape`:
      extraCheck = key === `Esc` || key === ESC_KEYCODE;
      break;

    case ` `:
      extraCheck = key === `Spacebar` || key === SPACE_KEYCODE;
      break;

    case `Enter`:
      extraCheck = key === ENTER_KEYCODE;
      break;

    case `ArrowRight`:
      extraCheck = key === `Right` || key === ARROW_RIGHT_KEYCODE;
      break;

    case `ArrowLeft`:
      extraCheck = key === `Left` || key === ARROW_LEFT_KEYCODE;
      break;

    case `ArrowDown`:
      extraCheck = key === `Down` || key === ARROW_DOWN_KEYCODE;
      break;

    case `ArrowUp`:
      extraCheck = key === `Up` || key === ARROW_UP_KEYCODE;
      break;

    case `PageUp`:
      extraCheck = key === PAGE_UP_KEYCODE;
      break;

    case `PageDown`:
      extraCheck = key === PAGE_DOWN_KEYCODE;
      break;

    case `End`:
      extraCheck = key === END_KEYCODE;
      break;

    case `Home`:
      extraCheck = key === HOME_KEYCODE;
      break;
  }

  return сheck || extraCheck;
};

const tab = (evt) => checkKey(evt, `Tab`);
const escape = (evt) => checkKey(evt, `Escape`);
const space = (evt) => checkKey(evt, ` `);
const enter = (evt) => checkKey(evt, `Enter`);
const arrowRight = (evt) => checkKey(evt, `ArrowRight`);
const arrowLeft = (evt) => checkKey(evt, `ArrowLeft`);
const arrowDown = (evt) => checkKey(evt, `ArrowDown`);
const arrowUp = (evt) => checkKey(evt, `ArrowUp`);
const pageUp = (evt) => checkKey(evt, `PageUp`);
const pageDown = (evt) => checkKey(evt, `PageDown`);
const end = (evt) => checkKey(evt, `End`);
const home = (evt) => checkKey(evt, `Home`);

export {
  tab,
  escape,
  space,
  enter,
  arrowRight,
  arrowLeft,
  arrowDown,
  arrowUp,
  pageUp,
  pageDown,
  end,
  home
};
