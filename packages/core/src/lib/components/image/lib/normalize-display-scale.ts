export const normalizeDisplayScale = (scale: number) => {
  const roundedScale = Math.round(scale / 50) * 50;
  return Math.min(Math.max(roundedScale, 50), 200);
};
