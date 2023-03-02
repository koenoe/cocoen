import type { Orientation } from '../config';

export const calculatePointfromEvent = (
  event: MouseEvent | TouchEvent,
  offsetElement?: HTMLElement,
  orientation: Orientation = 'horizontal',
): number => {
  let point = 0;
  let offset = 0;
  if (orientation === 'horizontal') {
    point =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    offset = offsetElement?.getBoundingClientRect().left ?? 0;
  } else if (orientation === 'vertical') {
    point =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    offset = offsetElement?.getBoundingClientRect().top ?? 0;
  }
  return point - offset;
};
