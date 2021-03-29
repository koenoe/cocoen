import { create } from './create';

describe('create', () => {
  afterEach(() => jest.restoreAllMocks());

  test('should create `<cocoen-component /> with two images`', () => {
    const div = document.createElement('div');
    const spy = jest.spyOn(document, 'createElement');

    div.innerHTML = `
      <img src="before.jpg" alt="" />
      <img src="after.jpg" alt="" />
    `;

    const component = create(div);
    const images = component.querySelectorAll('img');

    expect(spy).toHaveBeenCalledWith('cocoen-component');
    expect(images).toHaveLength(2);
  });

  test("should throw error if element doesn't contain two images", () => {
    const div = document.createElement('div');

    expect(() => {
      create(div);
    }).toThrow('Cocoen needs two images');
  });
});
