"use client";
import { useCallback } from "react";

import {
  type ScaleState,
  type OriginAction,
  type ScaleAction,
  DISPLAY as DISPLAY_STYLE,
} from "../reducer";
import { getZoomAnnouncer } from "../lib";

interface UseZoomControlsProps {
  scaleState: ScaleState;
  originDispatch: React.Dispatch<OriginAction>;
  scaleDispatch: React.Dispatch<ScaleAction>;
  onAnnounce: (message: string) => void;
}

export interface UseZoomControlsReturn {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomInOut: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export const useZoomControls = ({
  scaleState,
  originDispatch,
  scaleDispatch,
  onAnnounce,
}: UseZoomControlsProps): UseZoomControlsReturn => {
  const handleZoomIn = useCallback(() => {
    if (scaleState.displayScale <= DISPLAY_STYLE.INITIAL) {
      originDispatch({ type: "reset" });
    }
    onAnnounce(
      getZoomAnnouncer({ action: "in", displayScale: scaleState.displayScale }),
    );
    scaleDispatch({ type: "zoomIn" });
  }, [scaleState.displayScale, originDispatch, scaleDispatch, onAnnounce]);

  const handleZoomOut = useCallback(() => {
    if (scaleState.displayScale <= DISPLAY_STYLE.INITIAL) {
      originDispatch({ type: "reset" });
    }

    onAnnounce(
      getZoomAnnouncer({
        action: "out",
        displayScale: scaleState.displayScale,
      }),
    );
    scaleDispatch({ type: "zoomOut" });
  }, [scaleState.displayScale, originDispatch, scaleDispatch, onAnnounce]);

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
        onAnnounce(
          getZoomAnnouncer({
            action: "in",
            displayScale: scaleState.displayScale,
          }),
        );
        scaleDispatch({ type: "zoomIn" });
        return;
      } else {
        if (isZoomMax) {
          scaleDispatch({ type: "reset" });
          onAnnounce(`Zoom ${DISPLAY_STYLE.INITIAL}%`);
        } else {
          onAnnounce(
            getZoomAnnouncer({
              action: "out",
              displayScale: scaleState.displayScale,
            }),
          );
          scaleDispatch({ type: "zoomOut" });
          return;
        }
      }
    },
    [originDispatch, scaleDispatch, scaleState.displayScale, onAnnounce],
  );

  return {
    handleZoomIn,
    handleZoomOut,
    handleZoomInOut,
  };
};
