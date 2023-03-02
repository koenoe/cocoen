import { calculateElementHeight } from './calculate-element-height';

describe('calculateElementHeight', () => {
  test('should calculate computed height of an element', () => {
    document.body.innerHTML = `
      <div id="test" style="Height: 500px;" />
    `;
    const element = document.querySelector<HTMLElement>('#test') as HTMLElement;
    const result = calculateElementHeight(element);

    expect(result).toEqual(500);
  });
});
