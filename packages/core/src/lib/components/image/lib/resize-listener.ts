export const addResizeListener = (
  callback: () => void,
): VisualViewport | null => {
  const visualViewport = window.visualViewport;
  if (visualViewport) {
    visualViewport.addEventListener("resize", callback);
    return visualViewport;
  } else {
    window.addEventListener("resize", callback);
    return null;
  }
};

export const removeResizeListener = (
  callback: () => void,
  visualViewport: VisualViewport | null,
): void => {
  if (visualViewport) {
    visualViewport.removeEventListener("resize", callback);
  } else {
    window.removeEventListener("resize", callback);
  }
};
