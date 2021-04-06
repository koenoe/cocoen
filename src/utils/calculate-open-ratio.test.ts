import { calculateOpenRatio } from './calculate-open-ratio';

describe('calculateOpenRatio', () => {
  test('should return open ratio value based on host and drag element widths', () => {
    const dragElementWidth = 10;
    const hostElementWidth = 500;
    const x = 250;
    const result = calculateOpenRatio({
      dragElementWidth,
      hostElementWidth,
      x,
    });

    expect(result).toEqual(51);
  });
});
