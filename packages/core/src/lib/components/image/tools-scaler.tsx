"use client";
import React, { useEffect, useRef } from "react";
import { TOOLS_ACTIONS, TOOLS_ARIA_LABELS } from "./constants/viewer-tools";
import { Icons } from "./icons";
import {
  initialScale,
  OriginAction,
  type ScaleAction,
  initialOrigin,
  DISPLAY as DISPLAY_STYLE,
} from "./reducer";
import type { UseZoomControls } from "./hooks/use-zoom-controls";
import ToolsTooltip from "./tools-tooltip";

export interface ToolsScalerProps {
  scaleState: typeof initialScale;
  scaleDispatch: React.Dispatch<ScaleAction>;
  originDispatch: React.Dispatch<OriginAction>;
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  lastMousePosition: typeof initialOrigin;
  zoomControls: UseZoomControls;
}

const ToolsScaler: React.FC<ToolsScalerProps> = ({
  scaleState,
  scaleDispatch,
  originDispatch,
  isFocus,
  setIsFocus,
  lastMousePosition,
  zoomControls,
}) => {
  const scaleInputRef = useRef<HTMLInputElement>(null);

  const handleInputBlur = () => {
    scaleDispatch({ type: "blur" });
    setIsFocus(false);
  };

  const handleInputFocus = () => {
    scaleInputRef.current?.focus();

    scaleDispatch({ type: "reset" });
    originDispatch({
      type: "zoomInOut",
      payload: lastMousePosition,
    });

    setIsFocus(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    scaleDispatch({
      type: "changeDisplayOnly",
      payload: Number(e.target.value),
    });
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (DISPLAY_STYLE.INITIAL > scaleState.displayScale) {
        originDispatch({ type: "reset" });
      }

      scaleDispatch({ type: "enter" });
      setIsFocus(false);
      scaleInputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (isFocus && scaleInputRef.current) {
      scaleInputRef.current.focus();
      scaleInputRef.current.select();
    }
  }, [isFocus]);

  return (
    <div className="notion-tools-scaler">
      <ToolsTooltip
        className="notion-tools-scaler-zoom-out"
        content={TOOLS_ACTIONS.ZOOM_OUT}
        hint="-"
        aria={{ label: TOOLS_ARIA_LABELS.ZOOM_OUT }}
        onClick={zoomControls.handleZoomOut}
        icon={<Icons.Minus />}
      />

      <div
        className="notion-tools-scaler-container"
        aria-label={TOOLS_ARIA_LABELS.SCALER_INPUT}
        aria-disabled={isFocus}
      >
        {isFocus ? (
          <>
            <input
              type="number"
              name="scaler-input"
              ref={scaleInputRef}
              value={scaleState.displayScale}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              onKeyDown={handleInputEnter}
              autoFocus
            />
            <span>%</span>
          </>
        ) : (
          <button onClick={handleInputFocus}>
            <span>{scaleState.displayScale}%</span>
          </button>
        )}
      </div>

      <ToolsTooltip
        className="notion-tools-scaler-zoom-in"
        content={TOOLS_ACTIONS.ZOOM_IN}
        hint="+"
        aria={{ label: TOOLS_ARIA_LABELS.ZOOM_IN }}
        onClick={zoomControls.handleZoomIn}
        icon={<Icons.Plus />}
      />
    </div>
  );
};

export default ToolsScaler;
