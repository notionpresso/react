import { useState, useCallback } from "react";

import { getVisibleImages } from "../../lib/get-visible-images";

export const useImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const collectImages = useCallback(() => {
    const visibleImages = getVisibleImages();
    setImageUrls(visibleImages);
  }, []);

  return {
    imageUrls,
    collectImages,
  };
};
