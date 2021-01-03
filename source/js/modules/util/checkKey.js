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

const TAB = (evt) => checkKey(evt, `Tab`);
const ESCAPE = (evt) => checkKey(evt, `Escape`);
const SPACE = (evt) => checkKey(evt, ` `);
const ENTER = (evt) => checkKey(evt, `Enter`);
const ARROW_RIGHT = (evt) => checkKey(evt, `ArrowRight`);
const ARROW_LEFT = (evt) => checkKey(evt, `ArrowLeft`);
const ARROW_DOWN = (evt) => checkKey(evt, `ArrowDown`);
const ARROW_UP = (evt) => checkKey(evt, `ArrowUp`);
const PAGE_UP = (evt) => checkKey(evt, `PageUp`);
const PAGE_DOWN = (evt) => checkKey(evt, `PageDown`);
const END = (evt) => checkKey(evt, `End`);
const HOME = (evt) => checkKey(evt, `Home`);

export {
  TAB,
  ESCAPE,
  SPACE,
  ENTER,
  ARROW_RIGHT,
  ARROW_LEFT,
  ARROW_DOWN,
  ARROW_UP,
  PAGE_UP,
  PAGE_DOWN,
  END,
  HOME
};
