class Range {
  constructor(elem) {
    this.elem = elem;
    this.inputs = elem.querySelectorAll(`input[type="range"]`);
    this.form = this.inputs[0].form;
  }

  init() {
    this.elem.classList.remove(`range--nojs`);

    this.inputs.forEach((input) => {
      input.output = this.elem.querySelector(`output[for="${input.id}"]`);
      input.output.hidden = false;
      this.setOutputValue(input);
    });

    this.elem.addEventListener(`input`, this.onRangeInput.bind(this));
    if (this.form !== undefined) {
      this.form.addEventListener(`reset`, this.onRangeFormReset.bind(this));
    }
  }

  setOutputValue(input) {
    input.output.value = `$ ${input.value}`;
  }

  setCSSVariable(input) {
    this.elem.style.setProperty(`--${input.id}`, input.value);
  }

  onRangeFormReset() {
    const timer = setTimeout(() => {
      this.inputs.forEach((input) => {
        this.setCSSVariable(input);
        this.setOutputValue(input);
      });
      clearTimeout(timer);
    }, 0);
  }

  onRangeInput(evt) {
    const target = evt.target;

    if (target.tagName === `INPUT` && target.type === `range`) {
      this.setCSSVariable(target);
      this.setOutputValue(target);
    }
  }
}

export default Range;
