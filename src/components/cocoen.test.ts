import './cocoen';

import { fixture, html } from '@open-wc/testing';

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

  it('should have the correct shadowDOM', async () => {
    const component = await fixture(
      html` <cocoen-component></cocoen-component> `,
    );
    expect(component.shadowRoot?.innerHTML).toMatchSnapshot();
  });

  // it('should update styles when setting `openRatio`', async () => {
  //   const component = await fixture(
  //     html` <cocoen-component></cocoen-component> `,
  //   );
  //   const spy = jest.spyOn(component, 'openRatio', 'set');
  //   component.openRatio = 50;

  //   expect(spy).toHaveBeenCalled();
  //   expect(component.openRatio).toBe(50);
  // });
});
