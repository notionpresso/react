"use client";
import React, { useEffect, useRef } from "react";
import {
  type ScaleState,
  type OriginAction,
  type ScaleAction,
  DISPLAY as DISPLAY_STYLE,
} from "./reducer";
import type { UseZoomControlsReturn } from "./hooks/use-zoom-controls";
import ToolsTooltip from "./tools-tooltip";
import { Icons } from "./icons";
import {
  TOOLS_ACTIONS,
  TOOLS_ARIA_DESCRIBEDBY,
  TOOLS_ARIA_LABELS,
} from "./constants";

export interface ToolsScalerProps {
  scaleState: ScaleState;
  scaleDispatch: React.Dispatch<ScaleAction>;
  originDispatch: React.Dispatch<OriginAction>;
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  zoomControls: UseZoomControlsReturn;
}

const ToolsScaler: React.FC<ToolsScalerProps> = ({
  scaleState,
  scaleDispatch,
  originDispatch,
  isFocus,
  setIsFocus,
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

  const isZoomIn = scaleState.displayScale === DISPLAY_STYLE.MAX;
  const isZoomOut = scaleState.displayScale === DISPLAY_STYLE.MIN;

  return (
    <div className="notion-tools-scaler">
      <ToolsTooltip
        className="notion-tools-scaler-zoom-out"
        content={TOOLS_ACTIONS.ZOOM_OUT}
        hint="-"
        aria={{
          label: TOOLS_ARIA_LABELS.ZOOM_OUT,
          disabled: isZoomOut,
          describedby: TOOLS_ARIA_DESCRIBEDBY.ZOOM_OUT,
        }}
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
              aria-label={TOOLS_ARIA_LABELS.SCALER_INPUT}
              aria-disabled={isFocus}
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
        aria={{
          label: TOOLS_ARIA_LABELS.ZOOM_IN,
          disabled: isZoomIn,
          describedby: TOOLS_ARIA_DESCRIBEDBY.ZOOM_IN,
        }}
        onClick={zoomControls.handleZoomIn}
        icon={<Icons.Plus />}
      />
    </div>
  );
};

export default ToolsScaler;
