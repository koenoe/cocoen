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
  const clampedX = Math.min(Math.max(x, 0), hostElementWidth);
  const halfDragWidth = 0.5 * dragElementWidth;
  const ratio = (clampedX + halfDragWidth) / hostElementWidth;
  return 100 * ratio;
};
