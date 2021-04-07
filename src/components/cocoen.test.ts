import './cocoen';

import { fixture, html, oneEvent } from '@open-wc/testing';

import type { Cocoen } from './cocoen';

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

  test('should have the correct shadowDOM', async () => {
    const component = await fixture(
      html` <cocoen-component></cocoen-component> `,
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
      html` <cocoen-component></cocoen-component> `,
    );
    setTimeout(() => component.updateDimensions());
    const event = await oneEvent(component, 'cocoen-component:resized');
    expect(event).toBeTruthy();
  });

  test('should dispatch custom `updated` event', async () => {
    const component: Cocoen = await fixture(
      html` <cocoen-component></cocoen-component> `,
    );
    setTimeout(() => component.updateStyles());
    const event = await oneEvent(component, 'cocoen-component:updated');
    expect(event).toBeTruthy();
  });
});
