import { calculatePointfromEvent } from './calculate-point-from-event';

describe('calculatePointfromEvent', () => {
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

    const x = calculatePointfromEvent(event);
    const y = calculatePointfromEvent(event, undefined, 'vertical');

    expect(x).toEqual(290);
    expect(y).toEqual(260);
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

    const x = calculatePointfromEvent(event);
    const y = calculatePointfromEvent(event, undefined, 'vertical');

    expect(x).toEqual(290);
    expect(y).toEqual(260);
  });
});
