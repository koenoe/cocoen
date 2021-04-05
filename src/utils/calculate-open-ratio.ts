type CalculateOpenRatioPayload = {
  x: number;
  dragElementWidth: number;
  hostElementWidth: number;
};
export const calculateOpenRatio = ({
  dragElementWidth,
  hostElementWidth,
  x,
}: CalculateOpenRatioPayload): number => {
  let value = x;
  if (x < 0) {
    value = dragElementWidth;
  } else if (x >= hostElementWidth) {
    value = hostElementWidth - dragElementWidth;
  }

  let ratio = value + dragElementWidth / 2;
  ratio /= hostElementWidth;
  return ratio * 100;
};
