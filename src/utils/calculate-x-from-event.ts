export const calculateXfromEvent = (
  event: MouseEvent | TouchEvent,
  offsetElement?: HTMLElement,
): number => {
  const clientX =
    event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  const offsetLeft = offsetElement?.getBoundingClientRect().left ?? 0;
  return clientX - offsetLeft;
};
