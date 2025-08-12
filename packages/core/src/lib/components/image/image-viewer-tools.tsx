import React from "react";

import { motion } from "framer-motion";
import { handleDownload } from "./lib";

import Icon from "./assets";
import Tooltip from "./image-viewer-tools-tooltip";

type ImageViewerToolsProps = {
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
};

const ImageViewerTools: React.FC<ImageViewerToolsProps> = ({
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
    <motion.nav
      className="notion-image-viewer-tools"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {imageLength > 1 && (
        <div className="notion-image-viewer-controls">
          <Tooltip
            content="Back"
            hint={`${currentImageIndex} of ${imageLength} `}
            disabled={!hasPrevious}
          >
            <button
              aria-label="image tools back button"
              aria-disabled={!hasPrevious}
              disabled={!hasPrevious}
              onClick={toPreviousImage}
            >
              <img src={Icon.ArrowBack} alt="image tools back button" />
            </button>
          </Tooltip>

          <Tooltip
            content="Next"
            hint={`${currentImageIndex + 2} of ${imageLength} `}
            disabled={!hasNext}
          >
            <button
              aria-label="image tools next button"
              aria-disabled={!hasNext}
              disabled={!hasNext}
              onClick={toNextImage}
            >
              <img src={Icon.ArrowForward} alt="image tools next button" />
            </button>
          </Tooltip>
        </div>
      )}

      <div className="notion-image-viewer-scaler">
        <Tooltip content="Zoom out" hint="-">
          <button
            aria-label="image zoom out button"
            onClick={onScaleDown}
            className="notion-image-viewer-tools-zoom-out"
          >
            <img src={Icon.Minus} alt="image zoom out button" />
          </button>
        </Tooltip>

        {isScaleFocus ? (
          <div
            className="notion-image-viewer-scaler-input"
            aria-label="scaler input"
            aria-disabled={isScaleFocus}
          >
            <input
              type="number"
              ref={scaleInputRef}
              value={displayScale}
              onBlur={onScaleBlur}
              onFocus={onScaleFocus}
              onChange={onScaleChange}
              onKeyDown={onScaleEnter}
              autoFocus
            />
            <span>%</span>
          </div>
        ) : (
          <button
            className="notion-image-viewer-scaler-input-button"
            onClick={onScaleFocus}
          >
            <span>{displayScale}%</span>
          </button>
        )}
        <Tooltip content="Zoom in" hint="+">
          <button aria-label="image tools zoom in button" onClick={onScaleUp}>
            <img src={Icon.Plus} alt="image tools zoom in button" />
          </button>
        </Tooltip>
      </div>

      <button
        className="notion-image-viewer-tools-download"
        aria-label="image download button"
        onClick={() => handleDownload(url)}
      >
        <img src={Icon.Download} alt="image download" />
      </button>

      <Tooltip content="Close" hint="esc">
        <button
          aria-label="image viewer close button"
          className="notion-image-viewer-tools-close"
          onClick={close}
        >
          <img src={Icon.Close} alt="image viewer close button" />
        </button>
      </Tooltip>
    </motion.nav>
  );
};

export default ImageViewerTools;
