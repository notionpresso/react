import React from "react";

import { motion } from "framer-motion";
import { Icons } from "./icons";
import { Tooltip } from "./tooltip";
import { motionAnimate } from "./constants";
import { handleDownload } from "./lib";

const DISABLED_IMAGE_LENGTH = 1;
const NEXT_IMAGE_INDEX = 2;

const TOOL_ACTIONS = {
  BACK: "Back",
  NEXT: "Next",
  ZOOM_OUT: "Zoom out",
  ZOOM_IN: "Zoom in",
  DOWNLOAD: "Download",
  CLOSE: "Close",
} as const;

const TOOL_ACTION_ARIA_LABELS = {
  BACK: "image tools back button",
  NEXT: "image tools next button",
  ZOOM_OUT: "image tools zoom out button",
  ZOOM_IN: "image tools zoom in button",
  DOWNLOAD: "image download button",
  CLOSE: "image viewer close button",
  SCALER_INPUT: "scaler input",
} as const;

interface ViewerToolsProps {
  url: string;
  currentImageIndex: number;
  imageLength: number;
  scaleInputRef: React.MutableRefObject<HTMLInputElement | null>;
  close: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  toPreviousImage: () => void;
  toNextImage: () => void;
  scale: number;
  displayScale: number;
  onScaleUp: () => void;
  onScaleDown: () => void;
  isScaleFocus: boolean;
  setIsScaleFocus: (focused: boolean) => void;
  onScaleFocus: () => void;
  onScaleBlur: () => void;
  onScaleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScaleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ViewerTools: React.FC<ViewerToolsProps> = ({
  url,
  currentImageIndex,
  imageLength,
  scaleInputRef,
  hasPrevious,
  hasNext,
  close,
  toPreviousImage,
  toNextImage,
  displayScale,
  onScaleUp,
  onScaleDown,
  isScaleFocus,
  onScaleFocus,
  onScaleBlur,
  onScaleChange,
  onScaleEnter,
}) => {
  return (
    <motion.nav className="notion-image-viewer-tools" {...motionAnimate}>
      {imageLength > DISABLED_IMAGE_LENGTH && (
        <div className="notion-tools-navigation">
          <Tooltip
            className="notion-tools-navigation-back"
            content={TOOL_ACTIONS.BACK}
            hint={`${currentImageIndex} of ${imageLength}`}
            aria={{
              label: TOOL_ACTION_ARIA_LABELS.BACK,
              disabled: !hasPrevious,
            }}
            onClick={toPreviousImage}
            icon={<Icons.ArrowBack />}
          />

          <Tooltip
            className="notion-tools-navigation-next"
            content={TOOL_ACTIONS.NEXT}
            hint={`${currentImageIndex + NEXT_IMAGE_INDEX} of ${imageLength}`}
            aria={{
              label: TOOL_ACTION_ARIA_LABELS.NEXT,
              disabled: !hasNext,
            }}
            onClick={toNextImage}
            icon={<Icons.ArrowForward />}
          />
        </div>
      )}

      <div className="notion-tools-scaler">
        <Tooltip
          className="notion-tools-scaler-zoom-out"
          content={TOOL_ACTIONS.ZOOM_OUT}
          hint="-"
          aria={{ label: TOOL_ACTION_ARIA_LABELS.ZOOM_OUT }}
          onClick={onScaleDown}
          icon={<Icons.Minus />}
        />

        <div
          className="notion-tools-scaler-container"
          aria-label={TOOL_ACTION_ARIA_LABELS.SCALER_INPUT}
          aria-disabled={isScaleFocus}
        >
          {isScaleFocus ? (
            <>
              <input
                type="number"
                name="scaler-input"
                ref={scaleInputRef}
                value={displayScale}
                onBlur={onScaleBlur}
                onFocus={onScaleFocus}
                onChange={onScaleChange}
                onKeyDown={onScaleEnter}
                autoFocus
              />
              <span>%</span>
            </>
          ) : (
            <button onClick={onScaleFocus}>
              <span>{displayScale}%</span>
            </button>
          )}
        </div>

        <Tooltip
          className="notion-tools-scaler-zoom-in"
          content={TOOL_ACTIONS.ZOOM_IN}
          hint="+"
          aria={{ label: TOOL_ACTION_ARIA_LABELS.ZOOM_IN }}
          onClick={onScaleUp}
          icon={<Icons.Plus />}
        />
      </div>

      <Tooltip
        className="notion-tools-download"
        content={TOOL_ACTIONS.DOWNLOAD}
        aria={{ label: TOOL_ACTION_ARIA_LABELS.DOWNLOAD }}
        onClick={() => handleDownload(url)}
        icon={<Icons.Download />}
      />

      <Tooltip
        className="notion-tools-close"
        content={TOOL_ACTIONS.CLOSE}
        hint="esc"
        aria={{ label: TOOL_ACTION_ARIA_LABELS.CLOSE }}
        onClick={close}
        icon={<Icons.Close />}
      />
    </motion.nav>
  );
};

export default ViewerTools;
