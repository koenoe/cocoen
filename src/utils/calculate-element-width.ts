export const calculateElementWidth = (element: HTMLElement): number =>
  Number.parseInt(window.getComputedStyle(element).width, 10);
