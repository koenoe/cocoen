import { Cocoen } from './components/cocoen';
import { componentName } from './config';

export const create = (element: Element): Cocoen => {
  const component = document.createElement(componentName) as Cocoen;
  const before = element.querySelectorAll('img')[0];
  const after = element.querySelectorAll('img')[1];

  if (!before || !after) {
    throw new Error('Cocoen needs two images');
  }

  before.setAttribute('slot', 'before');
  after.setAttribute('slot', 'after');
  component.append(before.cloneNode(true));
  component.append(after.cloneNode(true));
  element.replaceWith(component);

  return component;
};
