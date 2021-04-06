import { calculateXfromEvent } from './calculate-x-from-event';

describe('calculateXfromEvent', () => {
  test('should calculate x from MouseEvent', () => {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(
      'click',
      true,
      true,
      window,
      1,
      800,
      600,
      290,
      260,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    const result = calculateXfromEvent(event);

    expect(result).toEqual(290);
  });

  test('should calculate x from TouchEvent', () => {
    const event = new TouchEvent('touchstart', {
      touches: [
        {
          clientX: 290,
          clientY: 260,
        },
      ],
    } as TouchEventInit);
    const result = calculateXfromEvent(event);

    expect(result).toEqual(290);
  });
});
