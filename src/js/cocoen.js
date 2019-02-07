class Cocoen {
  constructor(element, options) {
    this.options = Object.assign({}, Cocoen.defaults, options);
    this.element = element || document.querySelector('.cocoen');
    this.originalElement = this.element.cloneNode(true);
    this.orientation = this.options.orientation;

    this.init();
  }

  init() {
    this.element.className = `${this.element.className} ${this.orientation}`;

    this.createElements();
    this.addEventListeners();
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

    firstImage.addEventListener('load', () => {
      this.dimensions();
    });
  }

  addEventListeners() {
    this.onTapCallback = this.onTap.bind(this);
    this.onDragCallback = this.onDrag.bind(this);
    this.onDragStartCallback = this.onDragStart.bind(this);
    this.onDragEndCallback = this.onDragEnd.bind(this);
    this.dimensionsCallback = this.dimensions.bind(this);

    this.element.addEventListener('click', this.onTapCallback);
    this.element.addEventListener('mousemove', this.onDragCallback);
    this.element.addEventListener('touchmove', this.onDragCallback);
    this.dragElement.addEventListener('mousedown', this.onDragStartCallback);
    this.dragElement.addEventListener('touchstart', this.onDragStartCallback);

    window.addEventListener('mouseup', this.onDragEndCallback);
    window.addEventListener('resize', this.dimensionsCallback);
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.onTapCallback);
    this.element.removeEventListener('mousemove', this.onDragCallback);
    this.element.removeEventListener('touchmove', this.onDragCallback);
    this.dragElement.removeEventListener('mousedown', this.onDragStartCallback);
    this.dragElement.removeEventListener('touchstart', this.onDragStartCallback);

    window.removeEventListener('mouseup', this.onDragEndCallback);
    window.removeEventListener('resize', this.dimensionsCallback);
  }

  dimensions() {
    if (this.orientation === 'vertical') {
      this.elementWidth = parseInt(window.getComputedStyle(this.element).width, 10);
      this.elementOffsetLeft = this.element.getBoundingClientRect().left + document.body.scrollLeft;
      this.beforeImage.style.width = `${this.elementWidth}px`;
      this.dragElementWidth = parseInt(window.getComputedStyle(this.dragElement).width, 10);
      this.minLeftPos = this.elementOffsetLeft + 10;
      this.maxLeftPos = (this.elementOffsetLeft + this.elementWidth) - this.dragElementWidth - 10;
    } else {
      this.elementHeight = parseInt(window.getComputedStyle(this.element).height, 10);
      this.elementOffsetTop = this.element.getBoundingClientRect().top + document.body.scrollTop;
      this.beforeImage.style.height = `${this.elementHeight}px`;
      this.dragElementHeight = parseInt(window.getComputedStyle(this.dragElement).height, 10);
      this.minTopPos = this.elementOffsetTop + 10;
      this.maxTopPos = (this.elementOffsetTop + this.elementHeight) - this.dragElementHeight - 10;
    }
  }

  onTap(e) {
    e.preventDefault();

    if (this.orientation === 'vertical') {
      this.leftPos = (e.pageX) ? e.pageX : e.touches[0].pageX;
    } else {
      this.topPos = (e.pageY) ? e.pageY : e.touches[0].pageY;
    }
    this.requestDrag();
  }

  onDragStart(e) {
    e.preventDefault();

    if (this.orientation === 'vertical') {
      const startX = (e.pageX) ? e.pageX : e.touches[0].pageX;
      const offsetLeft = this.dragElement.getBoundingClientRect().left + document.body.scrollLeft;
      this.posX = (offsetLeft + this.dragElementWidth) - startX;
    } else {
      const startY = (e.pageY) ? e.pageY : e.touches[0].pageY;
      const offsetTop = this.dragElement.getBoundingClientRect().top + document.body.scrollTop;
      this.posY = (offsetTop + this.dragElementHeight) - startY;
    }

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

    if (this.orientation === 'vertical') {
      this.moveX = (e.pageX) ? e.pageX : e.touches[0].pageX;
      this.leftPos = (this.moveX + this.posX) - this.dragElementWidth;
    } else {
      this.moveY = (e.pageY) ? e.pageY : e.touches[0].pageY;
      this.topPos = (this.moveY + this.posY) - this.dragElementHeight;
    }

    this.requestDrag();
  }

  drag() {
    let openRatio;
    if (this.orientation === 'vertical') {
      if (this.leftPos < this.minLeftPos) {
        this.leftPos = this.minLeftPos;
      } else if (this.leftPos > this.maxLeftPos) {
        this.leftPos = this.maxLeftPos;
      }

      openRatio = (this.leftPos + (this.dragElementWidth / 2)) - this.elementOffsetLeft;
      openRatio /= this.elementWidth;
      const width = `${openRatio * 100}%`;

      this.dragElement.style.left = width;
      this.beforeElement.style.width = width;
    } else {
      if (this.topPos < this.minTopPos) {
        this.topPos = this.minTopPos;
      } else if (this.topPos > this.maxTopPos) {
        this.topPos = this.maxTopPos;
      }

      openRatio = (this.topPos + (this.dragElementHeight / 2)) - this.elementOffsetTop;
      openRatio /= this.elementHeight;
      const height = `${openRatio * 100}%`;

      this.dragElement.style.top = height;
      this.beforeElement.style.height = height;
    }

    if (this.options.dragCallback) {
      this.options.dragCallback(openRatio);
    }
  }

  requestDrag() {
    window.requestAnimationFrame(this.drag.bind(this));
  }

  toggleOrientation() {
    if (this.orientation === 'vertical') {
      this.orientation = 'horizontal';
    } else {
      this.orientation = 'vertical';
    }

    this.reload();
  }

  changeOrientation(orientation) {
    this.orientation = orientation;
    this.reload();
  }

  reload() {
    this.removeEventListeners();

    const newElement = this.originalElement.cloneNode(true);
    this.element.replaceWith(newElement);
    this.element = newElement;

    this.init();
  }
}

Cocoen.defaults = {
  dragElementSelector: '.cocoen-drag',
  dragCallback: null,
  orientation: 'vertical',
};

module.exports = Cocoen;
