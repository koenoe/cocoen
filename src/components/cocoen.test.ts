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
});
