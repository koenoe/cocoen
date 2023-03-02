export const calculateElementHeight = (element: HTMLElement): number =>
  Number.parseInt(window.getComputedStyle(element).height, 10);
