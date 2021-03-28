import { debounce } from '../utils/debounce';

const css = `
  #container {
    box-sizing: border-box;
    cursor: pointer;
    line-height: 0;
    margin: 0 auto;
    overflow: hidden;
    padding: 0;
    position: relative;
    user-select: none;
  }


  #container *,
  #container *:after,
  #container *:before {
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
    background: #e9e0d2;
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    margin-left: -1px;
    position: absolute;
    top: 0;
    width: 2px;
  }

  #drag:before {
    border: 3px solid #e9e0d2;
    content: '';
    height: 30px;
    left: 50%;
    margin-left: -7px;
    margin-top: -18px;
    position: absolute;
    top: 50%;
    width: 14px;
  }

  ::slotted(img) {
    object-fit: contain;
    max-height: 100%;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  ::slotted(img[slot=after]) {
    display: block;
    width: 100%;
    max-width: 100%;
  }
`;

type CustomEventPayload = {
  detail: {
    elementWidth: number;
    openRatio: string;
    rendered: boolean;
  };
};

export class Cocoen extends HTMLElement {
  private container: HTMLElement | null;

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

  private openRatioValue = '50%';

  private isDraggingValue = false;

  private rendered = false;

  constructor() {
    super();

    this.container = null;
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
      this.openRatio = this.calculateOpenRatio(this.xValue);
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

  get openRatio(): string {
    return this.openRatioValue;
  }

  set openRatio(value: string) {
    this.openRatioValue = value;

    this.updateStyles();
  }

  connectedCallback(): void {
    if (!this.rendered) {
      this.render();
      this.rendered = true;

      document.dispatchEvent(
        new CustomEvent('cocoen:rendered', this.customEventPayload()),
      );
    }

    this.container = this.shadowDOM.querySelector('#container');
    this.drag = this.shadowDOM.querySelector('#drag');

    this.updateDimensions();

    this.container?.addEventListener('mousedown', this.onDragStartHandler);
    this.container?.addEventListener('touchstart', this.onDragStartHandler);
    this.container?.addEventListener('mousemove', this.onDragHandler);
    this.container?.addEventListener('touchmove', this.onDragHandler);
    this.container?.addEventListener('click', this.onClickHandler);

    window.addEventListener('resize', this.debouncedUpdateDimensions);
    window.addEventListener('mouseup', this.onDragEndHandler);
    window.addEventListener('touchend', this.onDragEndHandler);
  }

  disconnectedCallback(): void {
    this.container?.removeEventListener('mousedown', this.onDragStartHandler);
    this.container?.removeEventListener('touchstart', this.onDragStartHandler);
    this.container?.removeEventListener('mousemove', this.onDragHandler);
    this.container?.addEventListener('touchmove', this.onDragHandler);
    this.container?.removeEventListener('click', this.onClickHandler);

    window.removeEventListener('resize', this.debouncedUpdateDimensions);
    window.removeEventListener('mouseup', this.onDragEndHandler);
    window.removeEventListener('touchend', this.onDragEndHandler);
  }

  render(): void {
    this.shadowDOM.innerHTML = `
      <style>${css}</style>
      <div id="container">
        <div id="before">
          <slot name="before"></slot>
        </div>
        <slot name="after"></slot>
        <div id="drag"></div>
      </div>
    `;
  }

  updateDimensions(): void {
    if (this.container && this.drag) {
      this.elementWidth = Number.parseInt(
        window.getComputedStyle(this.container).width,
        10,
      );
      this.dragElementWidth = Number.parseInt(
        window.getComputedStyle(this.drag).width,
        10,
      );
    }

    document.dispatchEvent(
      new CustomEvent('cocoen:resized', this.customEventPayload()),
    );
  }

  updateStyles(): void {
    const before = this.container?.querySelector('#before') as HTMLElement;
    const drag = this.container?.querySelector('#drag') as HTMLElement;

    before.style.width = this.openRatio;
    drag.style.left = this.openRatio;

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

    this.x = this.calculateXfromEvent(event);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  onClick(event: MouseEvent): void {
    event.preventDefault();

    this.x = this.calculateXfromEvent(event);
  }

  calculateXfromEvent(event: MouseEvent | TouchEvent): number {
    let clientX = 0;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
    }

    const offsetLeft = this.container
      ? this.container.getBoundingClientRect().left
      : 0;
    return clientX - offsetLeft;
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
        rendered: this.rendered,
        openRatio: this.openRatio,
      },
    };
  }
}
