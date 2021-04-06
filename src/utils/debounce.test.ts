import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  let func: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/ban-types
  let debouncedFunc: Function;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  test('should execute just once', () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // Fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});
