import { create, parse } from './index';

describe('index', () => {
  test('should export `create`', () => {
    expect(create).toBeDefined();
  });
  test('should export `parse`', () => {
    expect(parse).toBeDefined();
  });
});
