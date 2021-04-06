import { formatPercentageAsString } from './format-percentage-as-string';

describe('formatPercentageAsString', () => {
  test('should format a number to a string percentage', () => {
    const result = formatPercentageAsString(50);

    expect(result).toEqual('50%');
  });
});
