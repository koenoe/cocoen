import { create } from './create';
import { parse } from './parse';

jest.mock('./create');

describe('parse', () => {
  afterEach(() => jest.restoreAllMocks());

  test('should call `create` for each `.cocoen` element', () => {
    const div = document.createElement('div');

    div.innerHTML = `
      <div class="cocoen">
        <img src="before.jpg" alt="" />
        <img src="after.jpg" alt="" />
      </div>
      <div class="cocoen">
        <img src="before.jpg" alt="" />
        <img src="after.jpg" alt="" />
      </div>
    `;

    parse(div);

    expect(create).toBeCalledTimes(2);
  });
});
