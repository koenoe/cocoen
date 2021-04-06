import { calculateElementWidth } from './calculate-element-width';

describe('calculateElementWidth', () => {
  test('should calculate computed width of an element', () => {
    document.body.innerHTML = `
      <div id="test" style="width: 500px;" />
    `;
    const element = document.querySelector<HTMLElement>('#test') as HTMLElement;
    const result = calculateElementWidth(element);

    expect(result).toEqual(500);
  });
});
