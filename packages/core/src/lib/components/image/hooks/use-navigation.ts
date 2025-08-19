export const useNavigation = (
  activeImageIndex: number,
  totalImages: number,
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const toNextImage = () =>
    setActiveImageIndex((prev) => Math.min(prev + 1, totalImages - 1));
  const toPreviousImage = () =>
    setActiveImageIndex((prev) => Math.max(prev - 1, 0));

  const hasNext = activeImageIndex < totalImages - 1;
  const hasPrevious = activeImageIndex > 0;

  return {
    toNextImage,
    toPreviousImage,
    hasNext,
    hasPrevious,
  };
};
