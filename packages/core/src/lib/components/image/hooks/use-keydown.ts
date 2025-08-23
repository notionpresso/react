"use client";
import { useEffect } from "react";
import type { UseZoomControls } from "./use-zoom-controls";

interface UseKeydownProps {
  close: () => void;
  zoomControls: UseZoomControls;
  toPreviousImage: () => void;
  toNextImage: () => void;
}

export const useKeydown = ({
  close,
  zoomControls,
  toPreviousImage,
  toNextImage,
}: UseKeydownProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyDownEvents: { [key: string]: () => void } = {
        Escape: close,
        "+": zoomControls.handleZoomIn,
        "=": zoomControls.handleZoomIn,
        "-": zoomControls.handleZoomOut,
        ArrowLeft: toPreviousImage,
        ArrowRight: toNextImage,
      };
      const action = keyDownEvents[e.key];

      if (action) {
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, zoomControls, toNextImage, toPreviousImage]);
};
