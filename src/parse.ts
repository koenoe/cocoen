import { name } from './config';
import { create } from './create';

export const parse = (context: HTMLElement): void => {
  const elements = [...context.querySelectorAll(`.${name}`)];
  elements.map((element) => create(element));
};
