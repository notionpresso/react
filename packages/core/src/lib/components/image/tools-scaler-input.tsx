"use client";

import { useEffect, useRef } from "react";

import {
  TOOLS_ARIA_DESCRIBEDBY,
  TOOLS_ARIA_HINTS,
  TOOLS_ARIA_LABELS,
} from "./constants";
import {
  type OriginAction,
  type ScaleAction,
  type ScaleState,
  DISPLAY as DISPLAY_STYLE,
} from "./reducer";

interface ToolsScalerInputProps {
  scaleState: ScaleState;
  scaleDispatch: React.Dispatch<ScaleAction>;
  originDispatch: React.Dispatch<OriginAction>;
  isFocus: boolean;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolsScalerInput = ({
  scaleState,
  scaleDispatch,
  originDispatch,
  isFocus,
  setIsFocus,
}: ToolsScalerInputProps) => {
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

  return (
    <>
      {isFocus ? (
        <>
          <input
            autoFocus
            type="number"
            inputMode="numeric"
            step={DISPLAY_STYLE.STEP}
            min={DISPLAY_STYLE.MIN}
            max={DISPLAY_STYLE.MAX}
            name="scaler-input"
            ref={scaleInputRef}
            value={scaleState.displayScale}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            onKeyDown={handleInputEnter}
            aria-label={TOOLS_ARIA_LABELS.SCALER_INPUT}
            aria-describedby={TOOLS_ARIA_DESCRIBEDBY.SCALER_INPUT}
          />
          <span>%</span>
          <span
            id={TOOLS_ARIA_DESCRIBEDBY.SCALER_INPUT}
            className="notion-sr-only"
          >
            {TOOLS_ARIA_HINTS.SCALER_INPUT}
          </span>
        </>
      ) : (
        <>
          <button
            onClick={handleInputFocus}
            aria-label={TOOLS_ARIA_LABELS.SCALER_INPUT_BUTTON}
            aria-describedby={TOOLS_ARIA_DESCRIBEDBY.SCALER_INPUT_BUTTON}
          >
            <span>{scaleState.displayScale}%</span>
          </button>
          <span
            id={TOOLS_ARIA_DESCRIBEDBY.SCALER_INPUT_BUTTON}
            className="notion-sr-only"
          >
            {TOOLS_ARIA_HINTS.SCALER_INPUT_BUTTON}
          </span>
        </>
      )}
    </>
  );
};

export default ToolsScalerInput;
