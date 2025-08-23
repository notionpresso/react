"use client";
import { useCallback, useEffect, useState } from "react";

const NAVIGATION = {
  START_INDEX: 0,
  MIN_INDEX: 0,

  NEXT_STEP: 1,
  PREV_STEP: -1,

  FIRST_INDEX: 0,
  LAST_INDEX_OFFSET: 1,
} as const;

export const useNavigation = (url: string, imageUrls: string[]) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = imageUrls.findIndex((imgUrl) => imgUrl === url);
    return Math.max(NAVIGATION.MIN_INDEX, index);
  });

  const toNextImage = useCallback(() => {
    setActiveIndex((prev) =>
      Math.min(
        prev + NAVIGATION.NEXT_STEP,
        imageUrls.length - NAVIGATION.LAST_INDEX_OFFSET,
      ),
    );
  }, [imageUrls.length]);

  const toPreviousImage = useCallback(() => {
    setActiveIndex((prev) =>
      Math.max(prev + NAVIGATION.PREV_STEP, NAVIGATION.MIN_INDEX),
    );
  }, []);

  useEffect(() => {
    if (imageUrls.length > NAVIGATION.MIN_INDEX) {
      const index = imageUrls.findIndex((findUrl) => findUrl === url);
      setActiveIndex(Math.max(NAVIGATION.MIN_INDEX, index));
    }
  }, [imageUrls, url]);

  return {
    activeIndex,
    toNextImage,
    toPreviousImage,
  };
};
