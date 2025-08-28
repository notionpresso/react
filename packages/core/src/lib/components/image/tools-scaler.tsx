"use client";
import React from "react";

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
  TOOLS_ARIA_HINTS,
  TOOLS_ARIA_LABELS,
} from "./constants";
import ToolsScalerInput from "./tools-scaler-input";

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
          describedby: TOOLS_ARIA_DESCRIBEDBY.ZOOM_OUT,
          hint: TOOLS_ARIA_HINTS.ZOOM_OUT,
        }}
        disabled={isZoomOut}
        onClick={zoomControls.handleZoomOut}
        icon={<Icons.Minus />}
      />

      <div className="notion-tools-scaler-container">
        <ToolsScalerInput
          scaleState={scaleState}
          scaleDispatch={scaleDispatch}
          originDispatch={originDispatch}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
        />
      </div>

      <ToolsTooltip
        className="notion-tools-scaler-zoom-in"
        content={TOOLS_ACTIONS.ZOOM_IN}
        hint="+"
        aria={{
          label: TOOLS_ARIA_LABELS.ZOOM_IN,
          describedby: TOOLS_ARIA_DESCRIBEDBY.ZOOM_IN,
          hint: TOOLS_ARIA_HINTS.ZOOM_IN,
        }}
        disabled={isZoomIn}
        onClick={zoomControls.handleZoomIn}
        icon={<Icons.Plus />}
      />
    </div>
  );
};

export default ToolsScaler;
