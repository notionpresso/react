"use client";
import { useCallback, useEffect } from "react";

import type { OriginAction, ScaleAction } from "../reducer";

interface UseKeydownProps {
  close: () => void;
  scaleDispatch: React.Dispatch<ScaleAction>;
  originDispatch: React.Dispatch<OriginAction>;
  toPreviousImage: () => void;
  toNextImage: () => void;
}

export const useKeydown = ({
  close,
  scaleDispatch,
  originDispatch,
  toPreviousImage,
  toNextImage,
}: UseKeydownProps) => {
  const handleZoomIn = useCallback(() => {
    originDispatch({ type: "reset" });
    scaleDispatch({ type: "zoomIn" });
  }, [originDispatch, scaleDispatch]);

  const handleZoomOut = useCallback(() => {
    originDispatch({ type: "reset" });
    scaleDispatch({ type: "zoomOut" });
  }, [originDispatch, scaleDispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyDownEvents: { [key: string]: () => void } = {
        Escape: close,
        "+": handleZoomIn,
        "=": handleZoomIn,
        "-": handleZoomOut,
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
  }, [close, handleZoomIn, handleZoomOut, toNextImage, toPreviousImage]);
};
