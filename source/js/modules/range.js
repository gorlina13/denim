class Range {
  constructor(elem) {
    this.elem = elem;
    this.inputs = elem.querySelectorAll(`input[type="range"]`);
    this.form = this.inputs[0].form;
  }

  init() {
    this.elem.addEventListener(`input`, this.onRangeInput.bind(this));
    if (this.form !== undefined) {
      this.form.addEventListener(`reset`, this.onRangeFormReset.bind(this));
    }
  }

  setCSSVariable(input) {
    this.elem.style.setProperty(`--${input.id}`, input.value);
  }

  onRangeFormReset() {
    const timer = setTimeout(() => {
      this.inputs.forEach((input) => this.setCSSVariable(input));
      clearTimeout(timer);
    }, 0);
  }

  onRangeInput(evt) {
    const target = evt.target;

    if (target.tagName === `INPUT` && target.type === `range`) {
      this.setCSSVariable(target);
    }
  }
}

export default Range;
