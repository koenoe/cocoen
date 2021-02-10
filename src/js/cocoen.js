class Cocoen {
  constructor(element, options) {
    this.options = Object.assign({}, Cocoen.defaults, options);
    this.element = element || document.querySelector('.cocoen');

    // bind event handlers
    this.handleTap = this.onTap.bind(this);
    this.handleDrag = this.onDrag.bind(this);
    this.handleDragStart = this.onDragStart.bind(this);
    this.handleDragEnd = this.onDragEnd.bind(this);
    this.handleResize = this.dimensions.bind(this);

    this.init();
  }

  init() {
    // If already active, escape
    if (this.isActive) return;
    this.createElements();
    this.addEventListeners();
    this.dimensions();

    // Set flag
    this.isActive = true;
  }

  destroy() {
    if (!this.isActive) return;

    this.removeEventListeners();
    this.destroyElements();
    this.cleanUp();

    this.isActive = false;
  }

  createElements() {
    // Create drag element
    const span = document.createElement('span');
    span.className = this.options.dragElementSelector.replace('.', '');
    this.element.appendChild(span);
    // Wrap first image in div
    const wrapper = document.createElement('div');
    const firstImage = this.element.querySelector('img:first-child');
    wrapper.appendChild(firstImage.cloneNode(true));
    firstImage.parentNode.replaceChild(wrapper, firstImage);
    // Set class elements we need later
    this.dragElement = this.element.querySelector(this.options.dragElementSelector);
    this.beforeElement = this.element.querySelector('div:first-child');
    this.beforeImage = this.beforeElement.querySelector('img');
  }

  destroyElements() {
    this.element.replaceChild(this.beforeImage, this.beforeElement);
    this.element.removeChild(this.dragElement);
  }

  addEventListeners() {
    this.element.addEventListener('click', this.handleTap);
    this.element.addEventListener('mousemove', this.handleDrag);
    this.element.addEventListener('touchmove', this.handleDrag);
    this.dragElement.addEventListener('mousedown', this.handleDragStart);
    this.dragElement.addEventListener('touchstart', this.handleDragStart);

    window.addEventListener('mouseup', this.handleDragEnd);
    window.addEventListener('resize', this.handleResize);
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.handleTap);
    this.element.removeEventListener('mousemove', this.handleDrag);
    this.element.removeEventListener('touchmove', this.handleDrag);
    this.dragElement.removeEventListener('mousedown', this.handleDragStart);
    this.dragElement.removeEventListener('touchstart', this.handleDragStart);

    window.removeEventListener('mouseup', this.handleDragEnd);
    window.removeEventListener('resize', this.handleResize);
  }

  cleanUp() {
    this.dragElement = null;
    this.beforeElement = null;
    this.beforeImage.style.removeProperty('width');
  }

  dimensions() {
    this.elementWidth = parseInt(window.getComputedStyle(this.element).width, 10);
    this.elementOffsetLeft = this.element.getBoundingClientRect().left + document.body.scrollLeft;
    this.beforeImage.style.width = `${this.elementWidth}px`;
    this.dragElementWidth = parseInt(window.getComputedStyle(this.dragElement).width, 10);
    this.minLeftPos = this.elementOffsetLeft + 10;
    this.maxLeftPos = (this.elementOffsetLeft + this.elementWidth) - this.dragElementWidth - 10;
  }

  onTap(e) {
    e.preventDefault();

    this.leftPos = (e.pageX) ? e.pageX : e.touches[0].pageX;
    this.requestDrag();
  }

  onDragStart(e) {
    e.preventDefault();

    const startX = (e.pageX) ? e.pageX : e.touches[0].pageX;
    const offsetLeft = this.dragElement.getBoundingClientRect().left + document.body.scrollLeft;
    this.posX = (offsetLeft + this.dragElementWidth) - startX;
    this.isDragging = true;
  }

  onDragEnd(e) {
    e.preventDefault();
    this.isDragging = false;
  }

  onDrag(e) {
    e.preventDefault();

    if (!this.isDragging) {
      return;
    }

    this.moveX = (e.pageX) ? e.pageX : e.touches[0].pageX;
    this.leftPos = (this.moveX + this.posX) - this.dragElementWidth;

    this.requestDrag();
  }

  drag() {
    if (this.leftPos < this.minLeftPos) {
      this.leftPos = this.minLeftPos;
    } else if (this.leftPos > this.maxLeftPos) {
      this.leftPos = this.maxLeftPos;
    }

    let openRatio = (this.leftPos + (this.dragElementWidth / 2)) - this.elementOffsetLeft;
    openRatio /= this.elementWidth;
    const width = `${openRatio * 100}%`;

    this.dragElement.style.left = width;
    this.beforeElement.style.width = width;

    if (this.options.dragCallback) {
      this.options.dragCallback(openRatio);
    }
  }

  requestDrag() {
    window.requestAnimationFrame(this.drag.bind(this));
  }
}

Cocoen.defaults = {
  dragElementSelector: '.cocoen-drag',
  dragCallback: null,
};

module.exports = Cocoen;
