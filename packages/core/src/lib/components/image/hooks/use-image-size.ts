"use client";
import { useEffect, useState, RefObject, useCallback } from "react";
import {
  getMaxSize,
  getViewport,
  addResizeListener,
  removeResizeListener,
  supportsIntersectionObserver,
  isSafari,
} from "../lib";

interface ImageMaxSize {
  maxWidth: number;
  maxHeight: number;
}

export const useImageSize = (
  imageRef: RefObject<HTMLImageElement>,
  activeIndex: number,
): ImageMaxSize => {
  const [maxSize, setMaxSize] = useState<ImageMaxSize>({
    maxWidth: 0,
    maxHeight: 0,
  });

  const calculateMaxSize = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    const { naturalWidth, naturalHeight } = image;
    if (naturalWidth === 0 || naturalHeight === 0) return;

    try {
      const { width: viewportWidth, height: viewportHeight } = getViewport();
      const calculatedSize = getMaxSize(
        naturalWidth,
        naturalHeight,
        viewportWidth,
        viewportHeight,
      );
      setMaxSize(calculatedSize);
    } catch (error) {
      console.error("❌ Error calculating max size:", error);
    }
  }, [imageRef]);

  const handleResize = useCallback(() => {
    requestAnimationFrame(calculateMaxSize);
  }, [calculateMaxSize]);

  const handleSafariIntersection = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    if (isSafari() && supportsIntersectionObserver()) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => calculateMaxSize(), 100);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(image);
      return observer;
    }

    return null;
  }, [imageRef, calculateMaxSize]);

  const handleImageLoad = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleLoad = () => calculateMaxSize();

    if (image.complete && image.naturalWidth > 0) {
      calculateMaxSize();
    } else {
      image.addEventListener("load", handleLoad, { once: true });
    }

    return handleLoad;
  }, [imageRef, calculateMaxSize]);

  const handleResizeEvents = useCallback(() => {
    return addResizeListener(handleResize);
  }, [handleResize]);

  const cleanup = useCallback(
    (
      handleLoad: () => void,
      visualViewport: VisualViewport | null,
      observer: IntersectionObserver | null,
    ) => {
      const image = imageRef.current;
      if (image) {
        image.removeEventListener("load", handleLoad);
      }

      removeResizeListener(handleResize, visualViewport);

      if (observer) {
        observer.disconnect();
      }
    },
    [imageRef, handleResize],
  );

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleLoad = handleImageLoad();
    const visualViewport = handleResizeEvents();
    const observer = handleSafariIntersection();

    return () => {
      if (handleLoad) {
        cleanup(handleLoad, visualViewport, observer ?? null);
      }
    };
  }, [
    imageRef,
    activeIndex,
    handleImageLoad,
    handleResizeEvents,
    handleSafariIntersection,
    cleanup,
  ]);

  return maxSize;
};
