export const setImageLoading = (imageElement: HTMLImageElement | null) => {
  if (!imageElement) return;

  const rect = imageElement.getBoundingClientRect();
  const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

  imageElement.loading = isInViewport ? "eager" : "lazy";
};
