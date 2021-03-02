import * as check from './util/checkKey';

class Accordion {
  constructor(elem) {
    this.elem = elem;
    // Allow for multiple accordion sections to be expanded at the same time
    this.allowMultiple = this.elem.hasAttribute(`data-allow-multiple`);
    // Allow for each toggle to both open and close individually
    this.allowToggle = (this.allowMultiple) ? this.allowMultiple : this.elem.hasAttribute(`data-allow-toggle`);
    this.triggers = [];
  }

  init() {
    const elemId = this.elem.id;
    const headings = this.elem.querySelectorAll(`.accordion__title`);

    headings.forEach((h, i) => {
      const panel = h.nextElementSibling;
      const panelId = `${elemId}-pane${i + 1}`;
      const buttonId = `${elemId}-btn${i + 1}`;
      const buttonTitle = h.innerHTML;
      const buttonHTML = `<button class="accordion__trigger"
        type="button"
        aria-expanded="false"
        aria-controls="${panelId}"
        id="${buttonId}">
          ${buttonTitle}
        </button>`;

      h.innerHTML = buttonHTML;
      const button = h.firstElementChild;
      button.panel = panel;
      this.triggers.push(button);

      panel.id = panelId;
      panel.hidden = true;
      panel.setAttribute(`role`, `region`);
      panel.setAttribute(`aria-labelledby`, buttonId);
    });

    this.elem.classList.remove(`accordion--nojs`);

    if (!this.allowToggle) {
      const expanded = this.elem.querySelector(`[aria-expanded="true"]`);
      if (expanded) {
        expanded.setAttribute(`aria-disabled`, `true`);
      }
    }

    this.elem.addEventListener(`click`, this.onAccordionClick.bind(this));
    this.elem.addEventListener(`keydown`, this.onAccordionKeydown.bind(this));
    this.elem.addEventListener(`focus`, this.onAccordionFocus.bind(this), true);
    this.elem.addEventListener(`blur`, this.onAccordionBlur.bind(this), true);
  }

  close(trigger) {
    trigger.setAttribute(`aria-expanded`, `false`);
    trigger.panel.hidden = true;

    if (!this.allowToggle) {
      trigger.removeAttribute(`aria-disabled`);
    }
  }

  open(trigger) {
    trigger.setAttribute(`aria-expanded`, `true`);
    trigger.panel.hidden = false;

    if (!this.allowToggle) {
      trigger.setAttribute(`aria-disabled`, `true`);
    }
  }

  onAccordionClick(evt) {
    const target = evt.target.closest(`.accordion__trigger`);

    if (target) {
      evt.preventDefault();

      const isExpanded = target.getAttribute(`aria-expanded`) === `true`;
      const active = this.triggers.find((t) => t.getAttribute(`aria-expanded`) === `true`);

      if (!this.allowMultiple && active && active !== target) {
        this.close(active);
      }

      if (!isExpanded) {
        this.open(target);
      } else if (this.allowToggle && isExpanded) {
        this.close(target);
      }
    }
  }

  onAccordionKeydown(evt) {
    const target = evt.target.closest(`.accordion__trigger`);

    if (target) {
      if (check.arrowUp(evt) || check.arrowDown(evt)) {
        evt.preventDefault();
        const index = this.triggers.indexOf(target);
        const direction = check.arrowDown(evt) ? 1 : -1;
        const length = this.triggers.length;
        const newIndex = (index + length + direction) % length;

        this.triggers[newIndex].focus();
      } else if (check.end(evt) || check.home(evt)) {
        evt.preventDefault();
        const newIndex = check.end(evt) ? this.triggers.length - 1 : 0;

        this.triggers[newIndex].focus();
      }
    }
  }

  onAccordionFocus(evt) {
    if (evt.target.classList.contains(`accordion__trigger`)) {
      this.elem.classList.add(`accordion--focus`);
    }
  }

  onAccordionBlur(evt) {
    if (evt.target.classList.contains(`accordion__trigger`)) {
      this.elem.classList.remove(`accordion--focus`);
    }
  }
}

export default Accordion;
