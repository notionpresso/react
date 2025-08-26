"use client";
import React, { useReducer, useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  initialOrigin,
  initialScale,
  originReducer,
  scaleReducer,
  CONVERSION,
} from "./reducer";

import {
  useNavigation,
  useImages,
  useKeydown,
  useZoomControls,
  useImageSize,
} from "./hooks";

import { getCursorStyle } from "./lib";
import { MOTION_STYLES } from "./constants";

import ViewerTools from "./viewer-tools";

interface ViewerImageProps {
  url: string;
  isCursor: boolean;
  caption: string;
  close: () => void;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
}

const ViewerImage: React.FC<ViewerImageProps> = ({
  url,
  caption,
  isCursor,
  close,
  handleMouseLeave,
  handleMouseEnter,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isFocus, setIsFocus] = useState(false);

  const visibleImages = useImages();

  const [scaleState, scaleDispatch] = useReducer(scaleReducer, initialScale);
  const [originState, originDispatch] = useReducer(
    originReducer,
    initialOrigin,
  );

  const { activeIndex, toNextImage, toPreviousImage } = useNavigation(
    url,
    visibleImages,
    scaleDispatch,
    originDispatch,
  );

  const { maxWidth, maxHeight } = useImageSize(imageRef, activeIndex);

  const zoomControls = useZoomControls({
    scaleState,
    originDispatch,
    scaleDispatch,
  });

  useKeydown({
    close,
    zoomControls,
    toPreviousImage,
    toNextImage,
  });

  const isTools = isCursor || isFocus;
  const isViewerNavigation = visibleImages.length > 1;

  return (
    <>
      <motion.div
        className="notion-viewer-content"
        style={{
          maxWidth: maxWidth > 0 ? `${maxWidth}px` : "100vw",
          maxHeight: maxHeight > 0 ? `${maxHeight}px` : "90vh",
          transform: `scale(${scaleState.styleScale})`,
          transformOrigin: `${originState.originX * CONVERSION.PERCENT_FACTOR}% ${originState.originY * CONVERSION.PERCENT_FACTOR}%`,
        }}
        onClick={zoomControls.handleZoomInOut}
      >
        <motion.img
          ref={imageRef}
          role="img"
          tabIndex={0}
          key={`${activeIndex}-${visibleImages[activeIndex]}-image`}
          alt={caption}
          src={visibleImages[activeIndex]}
          aria-label={`Image ${activeIndex + 1}/${visibleImages.length} at ${scaleState.displayScale}%`}
          style={{
            cursor: isCursor ? getCursorStyle(scaleState.styleScale) : "none",
          }}
          {...MOTION_STYLES}
        />
      </motion.div>
      {isTools && (
        <ViewerTools
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
        >
          {isViewerNavigation && (
            <ViewerTools.Navigation
              key={`${url}-navigation`}
              activeIndex={activeIndex}
              totalImages={visibleImages.length}
              toPreviousImage={toPreviousImage}
              toNextImage={toNextImage}
            />
          )}
          <ViewerTools.Scaler
            key={`${url}-scaler`}
            isFocus={isFocus}
            scaleState={scaleState}
            scaleDispatch={scaleDispatch}
            originDispatch={originDispatch}
            setIsFocus={setIsFocus}
            zoomControls={zoomControls}
          />
          <ViewerTools.Download
            key={`${url}-download`}
            url={visibleImages[activeIndex]}
          />
          <ViewerTools.Close key={`${url}-close`} close={close} />
        </ViewerTools>
      )}
    </>
  );
};

export default ViewerImage;
