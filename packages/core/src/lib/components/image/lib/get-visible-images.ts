export const getVisibleImages = (): string[] => {
  const visibleImages = document.querySelectorAll(
    ".notion-image img:not(.notion-toggle:not(.notion-toggle-open) .notion-image img)",
  );

  return Array.from(visibleImages).map(
    (image) => (image as HTMLImageElement).src,
  );
};
