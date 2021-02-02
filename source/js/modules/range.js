class Range {
  constructor(elem) {
    this.elem = elem;
  }

  init() {
    this.elem.addEventListener(`input`, this.onRangeInput);
  }

  onRangeInput(evt) {
    const target = evt.target;

    if (target.tagName === `INPUT` && target.type === `range`) {
      target.parentElement.style.setProperty(`--${target.id}`, target.value);
    }
  }
}

export default Range;
