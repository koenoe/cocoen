import type { Cocoen } from './components/cocoen';
import { componentName } from './config';

type Options = {
  start?: number;
  color?: string;
  [key: string]: unknown;
};

export const create = (element: HTMLElement, options?: Options): Cocoen => {
  const component = document.createElement(componentName) as Cocoen;
  const images = element.querySelectorAll('img');

  if (!images[0] || !images[1]) {
    throw new Error('Cocoen needs two images');
  }

  const before = images[0].cloneNode(true) as HTMLImageElement;
  const after = images[1].cloneNode(true) as HTMLImageElement;

  before.setAttribute('slot', 'before');
  after.setAttribute('slot', 'after');
  component.append(before, after);

  if (options && options.start) {
    component.setAttribute('start', String(options.start));
  }

  if (options && options.color) {
    component.setAttribute('color', options.color);
  }

  Object.entries(element.dataset).forEach(([key, value]) => {
    if (options?.[key] === undefined && value) {
      component.setAttribute(key, value);
    }
  });

  element.replaceWith(component);

  return component;
};
