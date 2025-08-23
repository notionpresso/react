"use client";
import { useCallback } from "react";

import {
  initialOrigin,
  initialScale,
  type OriginAction,
  type ScaleAction,
} from "../reducer";

const MAX_ZOOM_IN_THRESHOLD = 150;
const ZOOM_OUT_THRESHOLD = 100;

interface UseZoomControlsProps {
  scaleState: typeof initialScale;
  lastMousePosition: typeof initialOrigin;
  originDispatch: React.Dispatch<OriginAction>;
  scaleDispatch: React.Dispatch<ScaleAction>;
}

export interface UseZoomControls {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

export const useZoomControls = ({
  scaleState,
  originDispatch,
  lastMousePosition,
  scaleDispatch,
}: UseZoomControlsProps): UseZoomControls => {
  const handleZoomIn = useCallback(() => {
    if (scaleState.displayScale > MAX_ZOOM_IN_THRESHOLD) {
      originDispatch({ type: "reset" });
    }

    scaleDispatch({ type: "zoomIn" });
  }, [scaleState.displayScale, originDispatch, scaleDispatch]);

  const handleZoomOut = useCallback(() => {
    if (scaleState.displayScale > ZOOM_OUT_THRESHOLD) {
      originDispatch({
        type: "zoomInOut",
        payload: lastMousePosition,
      });
    } else {
      originDispatch({ type: "reset" });
    }
    scaleDispatch({ type: "zoomOut" });
  }, [
    scaleState.displayScale,
    originDispatch,
    lastMousePosition,
    scaleDispatch,
  ]);

  return {
    handleZoomIn,
    handleZoomOut,
  };
};
