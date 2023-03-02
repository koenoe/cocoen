import { Orientation, componentName } from '../config';
import { calculateElementHeight } from '../utils/calculate-element-height';
import { calculateElementWidth } from '../utils/calculate-element-width';
import { calculateOpenRatio } from '../utils/calculate-open-ratio';
import { calculatePointfromEvent } from '../utils/calculate-point-from-event';
import { debounce } from '../utils/debounce';
import { formatPercentageAsString } from '../utils/format-percentage-as-string';

type CustomEventPayload = {
  bubbles: boolean;
  composed: boolean;
  detail: {
    elementSize: number;
    openRatio: number;
    isRendered: boolean;
    isVisible: boolean;
  };
};

const css = `
  :host {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    display: block;
    overflow: hidden;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
  }

  :host *,
  :host *:after,
  :host *:before {
    box-sizing: inherit;
    -moz-box-sizing: inherit;
    -webkit-box-sizing: inherit;
  }

  #before {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 50%;
  }

  :host([orientation="vertical"]) #before {
    width: 100%;
    height: 50%;
  }

  #drag {
    background: var(--color, #fff);
    bottom: 0;
    cursor: ew-resize;
    left: 50%;
    position: absolute;
    top: 0;
    width: 2px;
    transform: translate3d(-50%, 0, 0);
  }

  :host([orientation="vertical"]) #drag {
    height: 2px;
    left: 0;
    top: 50%;
    width: 100%;
    cursor: ns-resize;
    transform: translate3d(0, -50%, 0);
  }

  #drag:before {
    border: 3px solid var(--color, #fff);
    content: '';
    height: 30px;
    left: 50%;
    position: absolute;
    top: 50%;
    width: 14px;
    transform: translate3d(-50%, -50%, 0);
  }

  :host([orientation="vertical"]) #drag:before {
    height: 14px;
    width: 30px;
  }

  ::slotted(img) {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  ::slotted(img[slot=before]) {
    max-width: none;
  }

  :host([orientation="vertical"]) ::slotted(img[slot=before]) {
    max-height: none;
    max-width: 100%;
  }

  ::slotted(img[slot=after]) {
    display: block;
    max-width: 100%;
    width: 100%;
  }

  :host([orientation="vertical"]) ::slotted(img[slot=after]) {
    max-height: 100%;
    height: 100%;
  }
`;

export class Cocoen extends HTMLElement {
  private drag: HTMLElement | null;

  private intersectionObserver: IntersectionObserver;

  private shadowDOM: ShadowRoot;

  private debouncedUpdateDimensions: () => void;

  private onClickHandler: (event: MouseEvent) => void;

  private onContextMenuHandler: () => void;

  private onDragEndHandler: (event: MouseEvent | TouchEvent) => void;

  private onDragHandler: (event: MouseEvent | TouchEvent) => void;

  private onDragStartHandler: (event: MouseEvent | TouchEvent) => void;

  private onIntersectionHandler: IntersectionObserverCallback;

  private animateToValue = 0;

  private colorValue = '#fff';

  private orientationValue: Orientation = 'horizontal';

  private dragElementSizeValue = 0;

  private elementSizeValue = 0;

  private isDraggingValue = false;

  private openRatioValue = 50;

  private isRenderedValue = false;

  private isVisibleValue = false;

  private pointValue = 0;

  constructor() {
    super();

    this.drag = null;
    this.shadowDOM = this.attachShadow({ mode: 'open' });

    this.onDragStartHandler = () => this.onDragStart();
    this.onDragEndHandler = () => this.onDragEnd();
    this.onDragHandler = (event: MouseEvent | TouchEvent) => this.onDrag(event);
    this.onClickHandler = (event: MouseEvent) => this.onClick(event);
    this.onContextMenuHandler = () => this.onContextMenu();
    this.onIntersectionHandler = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => this.onIntersection(entries, observer);

    this.debouncedUpdateDimensions = debounce(() => {
      this.updateDimensions();
    }, 250);

    this.intersectionObserver = new IntersectionObserver(
      this.onIntersectionHandler,
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    );
  }

  get point(): number {
    return this.pointValue;
  }

  set point(value: number) {
    this.pointValue = value;

    window.requestAnimationFrame(() => {
      this.openRatio = calculateOpenRatio({
        value: this.pointValue,
        dragElementSize: this.dragElementSize,
        hostElementSize: this.elementSize,
      });
    });
  }

  get elementSize(): number {
    return this.elementSizeValue;
  }

  set elementSize(value: number) {
    this.elementSizeValue = value;
  }

  get dragElementSize(): number {
    return this.dragElementSizeValue;
  }

  set dragElementSize(value: number) {
    this.dragElementSizeValue = value;
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

    window.requestAnimationFrame(() => {
      this.updateStyles();
    });
  }

  get color(): string {
    return this.colorValue;
  }

  set color(value: string) {
    this.colorValue = value;

    window.requestAnimationFrame(() => {
      this.style.setProperty('--color', this.color);
    });
  }

  get isVisible(): boolean {
    return this.isVisibleValue;
  }

  set isVisible(value: boolean) {
    this.isVisibleValue = value;
  }

  get isRendered(): boolean {
    return this.isRenderedValue;
  }

  set isRendered(value: boolean) {
    this.isRenderedValue = value;
  }

  get animateTo(): number {
    return this.animateToValue;
  }

  set animateTo(value: number) {
    this.animateToValue = value;
  }

  get orientation(): Orientation {
    return this.orientationValue;
  }

  set orientation(value: Orientation) {
    this.orientationValue = value;

    window.requestAnimationFrame(() => {
      this.updateDimensions();
      this.updateStyles();
    });
  }

  static get observedAttributes(): Array<string> {
    return ['start', 'color', 'orientation'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'start') {
      this.animateTo = Number.parseInt(String(this.getAttribute('start')), 10);
      if (this.isVisible) {
        this.openRatio = this.animateTo;
      }
    }

    if (name === 'color') {
      this.color = String(this.getAttribute('color'));
    }

    if (name === 'orientation') {
      this.orientation = this.getAttribute('orientation') as Orientation;
    }
  }

  connectedCallback(): void {
    if (this.isRendered) {
      return;
    }

    this.render();
    this.isRendered = true;

    this.dispatchEvent(
      new CustomEvent(`${componentName}:connected`, this.customEventPayload()),
    );

    this.drag = this.shadowDOM.querySelector('#drag');

    this.updateDimensions();

    this.addEventListener('mousedown', this.onDragStartHandler, {
      passive: true,
    });
    this.addEventListener('touchstart', this.onDragStartHandler, {
      passive: true,
    });
    this.addEventListener('mousemove', this.onDragHandler, { passive: true });
    this.addEventListener('touchmove', this.onDragHandler, { passive: true });
    this.addEventListener('click', this.onClickHandler, { passive: true });
    this.addEventListener('contextmenu', this.onContextMenuHandler, {
      passive: true,
    });

    window.addEventListener('resize', this.debouncedUpdateDimensions, {
      passive: true,
    });
    window.addEventListener('mouseup', this.onDragEndHandler, {
      passive: true,
    });
    window.addEventListener('touchend', this.onDragEndHandler, {
      passive: true,
    });

    this.intersectionObserver.observe(this);
  }

  disconnectedCallback(): void {
    this.dispatchEvent(
      new CustomEvent(
        `${componentName}:disconnected`,
        this.customEventPayload(),
      ),
    );

    this.removeEventListener('mousedown', this.onDragStartHandler);
    this.removeEventListener('touchstart', this.onDragStartHandler);
    this.removeEventListener('mousemove', this.onDragHandler);
    this.removeEventListener('touchmove', this.onDragHandler);
    this.removeEventListener('click', this.onClickHandler);
    this.removeEventListener('contextmenu', this.onContextMenuHandler);

    window.removeEventListener('resize', this.debouncedUpdateDimensions);
    window.removeEventListener('mouseup', this.onDragEndHandler);
    window.removeEventListener('touchend', this.onDragEndHandler);

    this.intersectionObserver.unobserve(this);
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
    this.elementSize =
      this.orientation === 'horizontal'
        ? calculateElementWidth(this)
        : calculateElementHeight(this);

    if (this.drag) {
      this.dragElementSize =
        this.orientation === 'horizontal'
          ? calculateElementWidth(this.drag)
          : calculateElementHeight(this.drag);
    }

    this.querySelectorAll('img').forEach((img) => {
      if (this.orientation === 'horizontal') {
        // eslint-disable-next-line no-param-reassign
        img.width = this.elementSize;
      } else {
        // eslint-disable-next-line no-param-reassign
        img.height = this.elementSize;
      }
    });

    this.dispatchEvent(
      new CustomEvent(`${componentName}:resized`, this.customEventPayload()),
    );
  }

  updateStyles(): void {
    const before = this.shadowDOM.querySelector('#before') as HTMLElement;
    const drag = this.shadowDOM.querySelector('#drag') as HTMLElement;
    const openRatio = formatPercentageAsString(this.openRatio);

    if (this.animateTo) {
      before.style.transition = 'width height .75s';
      drag.style.transition = 'left top .75s';
    } else {
      before.style.transition = 'none';
      drag.style.transition = 'none';
    }

    if (this.orientation === 'horizontal') {
      before.style.height = '100%';
      before.style.width = openRatio;
      drag.style.left = openRatio;
      drag.style.top = '0px';
    } else if (this.orientation === 'vertical') {
      before.style.width = '100%';
      before.style.height = openRatio;
      drag.style.top = openRatio;
      drag.style.left = '0px';
    }

    this.dispatchEvent(
      new CustomEvent(`${componentName}:updated`, this.customEventPayload()),
    );
  }

  onDragStart(): void {
    this.animateTo = 0;
    this.isDragging = true;
  }

  onDrag(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) {
      return;
    }

    this.point = calculatePointfromEvent(event, this, this.orientation);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }

  onClick(event: MouseEvent): void {
    this.animateTo = 0;
    this.point = calculatePointfromEvent(event, this, this.orientation);
  }

  onContextMenu(): void {
    this.isDragging = false;
  }

  onIntersection(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.dispatchEvent(
          new CustomEvent(
            `${componentName}:visible`,
            this.customEventPayload(),
          ),
        );
        if (this.animateTo) {
          this.openRatio = this.animateTo;
        }
        this.isVisible = true;
        observer.unobserve(this);
      }
    });
  }

  customEventPayload(): CustomEventPayload {
    return {
      bubbles: true,
      composed: true,
      detail: {
        elementSize: this.elementSize,
        openRatio: this.openRatio,
        isRendered: this.isRendered,
        isVisible: this.isVisible,
      },
    };
  }
}

// Define our custom Cocoen web component
customElements.define(componentName, Cocoen);
