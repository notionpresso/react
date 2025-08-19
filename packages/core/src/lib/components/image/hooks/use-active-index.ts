import { useEffect, useState } from "react";

export const useActiveIndex = (
  currentImageUrl: string,
  imageUrls: string[],
) => {
  const [activeImageIndex, setActiveImageIndex] = useState(() => {
    const index = imageUrls.findIndex((imgUrl) => imgUrl === currentImageUrl);
    return Math.max(0, index);
  });

  useEffect(() => {
    if (imageUrls.length > 0) {
      const index = imageUrls.findIndex((url) => url === currentImageUrl);
      setActiveImageIndex(Math.max(0, index));
    }
  }, [imageUrls, currentImageUrl]);

  return { activeImageIndex, setActiveImageIndex };
};
