const init = Symbol('init');
const createElements = Symbol('createElements');
const setDimensions = Symbol('setDimensions');
const addEventListeners = Symbol('addEventListeners');

class Cocoen {
  constructor(element, options) {
    this.options = Object.assign({}, Cocoen.defaults, options);
    this.element = element || document.querySelector('.cocoen');

    this[init]();
  }

  [init]() {
    this[createElements]();
    this[setDimensions]();
    this[addEventListeners]();
  }

  [createElements]() {
    // Create drag element
    const span = document.createElement('span');
    span.className = this.options.dragElementSelector.replace('.', '');
    this.element.appendChild(span);
    // Wrap first image in div
    const wrapper = document.createElement('div');
    const firstImage = this.element.querySelector('img:first-child');
    firstImage.before(wrapper);
    wrapper.append(firstImage);
    // Set class elements we need later
    this.dragElement = this.element.querySelector(this.options.dragElementSelector);
    this.beforeElement = this.element.querySelector('div:first-child');
    this.beforeImage = this.beforeElement.querySelector('img');
  }

  [setDimensions]() {
    this.elementWidth = parseInt(window.getComputedStyle(this.element).width, 10);
    this.elementOffsetLeft = this.element.offsetLeft;
    this.beforeImage.style.width = this.elementWidth;
    this.dragElementWidth = parseInt(window.getComputedStyle(this.dragElement).width, 10);
    this.minLeftPos = this.elementOffsetLeft + 10;
    this.maxLeftPos = (this.elementOffsetLeft + this.elementWidth) - this.dragElementWidth - 10;
  }

  [addEventListeners]() {
    console.log('addEventListeners', this); // eslint-disable-line
  }
}

Cocoen.defaults = {
  dragElementSelector: '.cocoen__drag',
};

module.exports = Cocoen;
