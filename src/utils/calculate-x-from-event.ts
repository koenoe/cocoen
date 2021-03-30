export const calculateXfromEvent = (
  event: MouseEvent | TouchEvent,
  offsetElement?: HTMLElement,
): number => {
  let clientX = 0;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
  } else if (event instanceof TouchEvent) {
    clientX = event.touches[0].clientX;
  }

  const offsetLeft = offsetElement?.getBoundingClientRect().left || 0;
  return clientX - offsetLeft;
};
