import { calculateOpenRatio } from './calculate-open-ratio';

describe('calculateOpenRatio', () => {
  test('should return open ratio value based on host and drag element Sizes', () => {
    const dragElementSize = 10;
    const hostElementSize = 500;
    const value = 250;
    const result = calculateOpenRatio({
      dragElementSize,
      hostElementSize,
      value,
    });

    expect(result).toEqual(51);
  });
});
