import { componentName } from '../config';
import { debounce } from '../utils/debounce';
import { calculateXfromEvent } from '../utils/calculate-x-from-event';
import { calculateOpenRatio } from '../utils/calculate-open-ratio';
import { calculateElementWidth } from '../utils/calculate-element-width';
import { formatPercentageAsString } from '../utils/format-percentage-as-string';

const css = `
  :host {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
  }


  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
  }

  #before {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
  }

  #drag {
    background: #fff;
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    margin-left: -1px;
    position: absolute;
    top: 0;
    width: 2px;
  }

  #drag:before {
    border: 3px solid #fff;
    content: '';
    height: 30px;
    left: 50%;
    margin-left: -7px;
    margin-top: -15px;
    position: absolute;
    top: 50%;
    width: 14px;
  }

  ::slotted(img) {
    max-height: 100%;
    object-fit: contain;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }
`;

type CustomEventPayload = {
  detail: {
    elementWidth: number;
    openRatio: number;
    rendered: boolean;
  };
};

export class Cocoen extends HTMLElement {
  private drag: HTMLElement | null;

  private shadowDOM: ShadowRoot;

  private onDragStartHandler: (event: MouseEvent | TouchEvent) => void;

  private onDragEndHandler: (event: MouseEvent | TouchEvent) => void;

  private onDragHandler: (event: MouseEvent | TouchEvent) => void;

  private onClickHandler: (event: MouseEvent) => void;

  private debouncedUpdateDimensions: () => void;

  private xValue = 0;

  private elementWidthValue = 0;

  private dragElementWidthValue = 0;

  private openRatioValue = 50;

  private isDraggingValue = false;

  private rendered = false;

  constructor() {
    super();

    this.drag = null;
    this.shadowDOM = this.attachShadow({ mode: 'closed' });

    this.onDragStartHandler = (event: MouseEvent | TouchEvent) =>
      this.onDragStart(event);

    this.onDragEndHandler = () => this.onDragEnd();
    this.onDragHandler = (event: MouseEvent | TouchEvent) => this.onDrag(event);
    this.onClickHandler = (event: MouseEvent) => this.onClick(event);

    this.debouncedUpdateDimensions = debounce(() => {
      this.updateDimensions();
    }, 250);
  }

  get x(): number {
    return this.xValue;
  }

  set x(value: number) {
    this.xValue = value;

    window.requestAnimationFrame(() => {
      this.openRatio = calculateOpenRatio({
        x: this.xValue,
        dragElementWidth: this.dragElementWidth,
        hostElementWidth: this.elementWidth,
      });
    });
  }

  get elementWidth(): number {
    return this.elementWidthValue;
  }

  set elementWidth(value: number) {
    this.elementWidthValue = value;
  }

  get dragElementWidth(): number {
    return this.dragElementWidthValue;
  }

  set dragElementWidth(value: number) {
    this.dragElementWidthValue = value;
  }

  get isDragging(): boolean {
    return this.isDraggingValue;
  }

  set isDragging(value: boolean) {
    this.isDraggingValue = value;
  }

  get openRatio(): number {
    return this.openRatioValue;
  }

  set openRatio(value: number) {
    this.openRatioValue = value;

    this.updateStyles();
  }

  connectedCallback(): void {
    if (this.rendered) {
      return;
    }

    this.render();
    this.rendered = true;

    document.dispatchEvent(
      new CustomEvent('cocoen:rendered', this.customEventPayload()),
    );

    this.drag = this.shadowDOM.querySelector('#drag');

    this.updateDimensions();

    this.addEventListener('mousedown', this.onDragStartHandler);
    this.addEventListener('touchstart', this.onDragStartHandler);
    this.addEventListener('mousemove', this.onDragHandler);
    this.addEventListener('touchmove', this.onDragHandler);
    this.addEventListener('click', this.onClickHandler);

    window.addEventListener('resize', this.debouncedUpdateDimensions);
    window.addEventListener('mouseup', this.onDragEndHandler);
    window.addEventListener('touchend', this.onDragEndHandler);
  }

  disconnectedCallback(): void {
    this.removeEventListener('mousedown', this.onDragStartHandler);
    this.removeEventListener('touchstart', this.onDragStartHandler);
    this.removeEventListener('mousemove', this.onDragHandler);
    this.removeEventListener('touchmove', this.onDragHandler);
    this.removeEventListener('click', this.onClickHandler);

    window.removeEventListener('resize', this.debouncedUpdateDimensions);
    window.removeEventListener('mouseup', this.onDragEndHandler);
    window.removeEventListener('touchend', this.onDragEndHandler);
  }

  render(): void {
    this.shadowDOM.innerHTML = `
      <style>${css}</style>
      <div id="before">
        <slot name="before"></slot>
      </div>
      <slot name="after"></slot>
      <div id="drag" part="drag"></div>
    `;
  }

  updateDimensions(): void {
    this.elementWidth = calculateElementWidth(this);

    if (this.drag) {
      this.dragElementWidth = calculateElementWidth(this.drag);
    }

    document.dispatchEvent(
      new CustomEvent('cocoen:resized', this.customEventPayload()),
    );
  }

  updateStyles(): void {
    const before = this.shadowDOM.querySelector('#before') as HTMLElement;
    const drag = this.shadowDOM.querySelector('#drag') as HTMLElement;
    const openRatio = formatPercentageAsString(this.openRatio);

    before.style.width = openRatio;
    drag.style.left = openRatio;

    document.dispatchEvent(
      new CustomEvent('cocoen:updated', this.customEventPayload()),
    );
  }

  onDragStart(event: MouseEvent | TouchEvent): void {
    event.preventDefault();

    this.isDragging = true;
  }

  onDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault();

    if (!this.isDragging) {
      return;
    }

    this.x = calculateXfromEvent(event, this);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  onClick(event: MouseEvent): void {
    event.preventDefault();

    this.x = calculateXfromEvent(event, this);
  }

  calculateOpenRatio(activeX: number): string {
    let value = activeX;
    if (activeX < 0) {
      value = this.dragElementWidth;
    } else if (activeX >= this.elementWidth) {
      value = this.elementWidth - this.dragElementWidth;
    }

    let ratio = value + this.dragElementWidth / 2;
    ratio /= this.elementWidth;
    return `${ratio * 100}%`;
  }

  customEventPayload(): CustomEventPayload {
    return {
      detail: {
        elementWidth: this.elementWidth,
        openRatio: this.openRatio,
        rendered: this.rendered,
      },
    };
  }
}

// Define our custom Cocoen web component
customElements.define(componentName, Cocoen);
