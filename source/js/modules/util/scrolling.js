const forbidScrolling = () => {
  const div = document.createElement(`div`);
  div.style.width = `50px`;
  div.style.height = `50px`;
  div.style.overflowY = `scroll`;
  document.body.appendChild(div);

  const scrollBarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  document.body.style.overflow = `hidden`;
  document.body.style.marginRight = `${scrollBarWidth}px`;
};

const allowScrolling = () => {
  document.body.style.overflow = ``;
  document.body.style.marginRight = ``;
};

export {
  forbidScrolling,
  allowScrolling
};
