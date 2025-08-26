"use client";
import { useCallback } from "react";

import {
  initialScale,
  type OriginAction,
  type ScaleAction,
  DISPLAY as DISPLAY_STYLE,
} from "../reducer";

interface UseZoomControlsProps {
  scaleState: typeof initialScale;
  originDispatch: React.Dispatch<OriginAction>;
  scaleDispatch: React.Dispatch<ScaleAction>;
}

export interface UseZoomControls {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomInOut: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export const useZoomControls = ({
  scaleState,
  originDispatch,
  scaleDispatch,
}: UseZoomControlsProps) => {
  const handleZoomIn = useCallback(() => {
    if (scaleState.displayScale <= DISPLAY_STYLE.INITIAL) {
      originDispatch({ type: "reset" });
    }
    scaleDispatch({ type: "zoomIn" });
  }, [scaleState.displayScale, originDispatch, scaleDispatch]);

  const handleZoomOut = useCallback(() => {
    if (scaleState.displayScale <= DISPLAY_STYLE.INITIAL) {
      originDispatch({ type: "reset" });
    }

    scaleDispatch({ type: "zoomOut" });
  }, [scaleState.displayScale, originDispatch, scaleDispatch]);

  const handleZoomInOut = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const { width, height, top, left } =
        event.currentTarget.getBoundingClientRect();
      const currentMouseX = (event.clientX - left) / width;
      const currentMouseY = (event.clientY - top) / height;

      const isZoomIn = scaleState.displayScale <= DISPLAY_STYLE.INITIAL;
      const isZoomMin = scaleState.displayScale > DISPLAY_STYLE.MIN;
      const isZoomMax = scaleState.displayScale >= DISPLAY_STYLE.MAX;

      if (isZoomIn) {
        if (isZoomMin) {
          originDispatch({
            type: "zoomInOut",
            payload: { originX: currentMouseX, originY: currentMouseY },
          });
        }
        scaleDispatch({ type: "zoomIn" });
      } else {
        if (isZoomMax) {
          scaleDispatch({ type: "reset" });
        } else {
          scaleDispatch({ type: "zoomOut" });
        }
      }
    },
    [originDispatch, scaleDispatch, scaleState.displayScale],
  );

  return {
    handleZoomIn,
    handleZoomOut,
    handleZoomInOut,
  };
};
