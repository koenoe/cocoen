type CalculateOpenRatioPayload = {
  value: number;
  dragElementSize: number;
  hostElementSize: number;
};

export const calculateOpenRatio = ({
  dragElementSize,
  hostElementSize,
  value,
}: CalculateOpenRatioPayload): number => {
  const clampedValue = Math.min(Math.max(value, 0), hostElementSize);
  const halfDragSize = 0.5 * dragElementSize;
  const ratio = (clampedValue + halfDragSize) / hostElementSize;
  return 100 * ratio;
};
