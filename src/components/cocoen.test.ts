import './cocoen';

import { fixture, html, oneEvent } from '@open-wc/testing';

import { calculatePointfromEvent } from '../utils/calculate-point-from-event';
import type { Cocoen } from './cocoen';

jest.mock('../utils/calculate-point-from-event');

const mockedMouseEvent = document.createEvent('MouseEvent');
mockedMouseEvent.initMouseEvent(
  'click',
  true,
  true,
  window,
  1,
  800,
  600,
  290,
  260,
  false,
  false,
  false,
  false,
  0,
  null,
);

describe('<cocoen-component />', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => jest.restoreAllMocks());

  test('should have the correct shadowDOM', async () => {
    const component = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  test('should dispatch custom `connected` event', async () => {
    const component = document.createElement('cocoen-component') as Cocoen;
    setTimeout(() => component.connectedCallback());
    const event = await oneEvent(component, 'cocoen-component:connected');
    expect(event).toBeTruthy();
  });

  test('should dispatch custom `disconnected` event', async () => {
    const component = document.createElement('cocoen-component') as Cocoen;
    setTimeout(() => component.disconnectedCallback());
    const event = await oneEvent(component, 'cocoen-component:disconnected');
    expect(event).toBeTruthy();
  });

  test('should dispatch custom `resized` event', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );
    setTimeout(() => component.updateDimensions());
    const event = await oneEvent(component, 'cocoen-component:resized');
    expect(event).toBeTruthy();
  });

  test('should dispatch custom `updated` event', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );
    setTimeout(() => component.updateStyles());
    const event = await oneEvent(component, 'cocoen-component:updated');
    expect(event).toBeTruthy();
  });

  test('should support `color` attribute', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component color="pink"></cocoen-component>`,
    );
    expect(component.color).toEqual('pink');
  });

  test('should support `start` attribute', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component start="75"></cocoen-component>`,
    );
    expect(component.animateTo).toEqual(75);
  });

  test('should call `calculatePointfromEvent` when clicked', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );

    component.onClick(mockedMouseEvent);
    expect(component.animateTo).toEqual(0);
    expect(calculatePointfromEvent).toBeCalledWith(mockedMouseEvent, component);
  });

  test('should set `isDragging` to `true` when drag starts', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );

    component.onDragStart();
    expect(component.animateTo).toEqual(0);
    expect(component.isDragging).toBeTruthy();
  });

  test('should set `isDragging` to `false` when drag ends', async () => {
    const component: Cocoen = await fixture(
      html`<cocoen-component></cocoen-component>`,
    );

    component.onDragStart();
    component.onDragEnd();
    expect(component.isDragging).toBeFalsy();
  });
});
