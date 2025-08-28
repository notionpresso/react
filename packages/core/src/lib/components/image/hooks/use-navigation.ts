"use client";
import { useCallback, useState } from "react";
import { OriginAction, ScaleAction } from "../reducer";
import { getClickedImageIndex } from "../lib";

export const NAVIGATION = {
  MIN_INDEX: 0,
  MAX_INDEX_OFFSET: 1,
  NEXT_STEP: 1,
  PREV_STEP: -1,
} as const;

interface UseNavigationReturn {
  activeIndex: number;
  toNextImage: () => void;
  toPreviousImage: () => void;
}

export const useNavigation = (
  url: string,
  visibleImages: string[],
  scaleDispatch: React.Dispatch<ScaleAction>,
  originDispatch: React.Dispatch<OriginAction>,
): UseNavigationReturn => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const clickedIndex = getClickedImageIndex(url);
    return Math.max(NAVIGATION.MIN_INDEX, clickedIndex);
  });

  const toNextImage = useCallback(() => {
    setActiveIndex((prevActiveIndex) =>
      Math.min(
        prevActiveIndex + NAVIGATION.NEXT_STEP,
        visibleImages.length - NAVIGATION.MAX_INDEX_OFFSET,
      ),
    );
    scaleDispatch({ type: "reset" });
    originDispatch({ type: "reset" });
  }, [visibleImages.length, scaleDispatch, originDispatch]);

  const toPreviousImage = useCallback(() => {
    setActiveIndex((prevActiveIndex) =>
      Math.max(prevActiveIndex + NAVIGATION.PREV_STEP, NAVIGATION.MIN_INDEX),
    );
    scaleDispatch({ type: "reset" });
    originDispatch({ type: "reset" });
  }, [scaleDispatch, originDispatch]);

  return {
    activeIndex,
    toNextImage,
    toPreviousImage,
  };
};
