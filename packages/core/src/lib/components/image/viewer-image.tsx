"use client";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import { useNavigation, useImages } from "./hooks";

import { getCursorStyle } from "./lib";
import { MOTION_STYLES } from "./constants";

import ViewerTools from "./viewer-tools";
import {
  initialOrigin,
  initialScale,
  originReducer,
  scaleReducer,
} from "./reducer";
import { useKeydown } from "./hooks/use-keydown";

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

  const imageUrls = useImages();

  const { activeIndex, toNextImage, toPreviousImage } = useNavigation(
    url,
    imageUrls,
  );

  const [scaleState, scaleDispatch] = useReducer(scaleReducer, initialScale);
  const [originState, originDispatch] = useReducer(
    originReducer,
    initialOrigin,
  );

  useEffect(() => {
    if (activeIndex) {
      scaleDispatch({ type: "reset" });
    }
  }, [activeIndex]);

  useKeydown({
    close,
    scaleDispatch,
    originDispatch,
    toPreviousImage,
    toNextImage,
  });

  const handleZoomInOut = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (!imageRef.current) {
        return;
      }

      const { width, height, top, left } =
        imageRef.current.getBoundingClientRect();
      const currentMouseX = (event.clientX - left) / width;
      const currentMouseY = (event.clientY - top) / height;

      originDispatch({
        type: "zoomInOut",
        payload: { originX: currentMouseX, originY: currentMouseY },
      });
      scaleDispatch({ type: "zoomInOut" });
    },
    [imageRef, originDispatch, scaleDispatch],
  );

  return (
    <div className="notion-viewer-content">
      <motion.img
        role="button"
        tabIndex={0}
        key={`${activeIndex}-${imageUrls[activeIndex]}-image`}
        ref={imageRef}
        alt={caption}
        src={imageUrls[activeIndex]}
        style={{
          transform: `scale(${scaleState.styleScale})`,
          transformOrigin: `${originState.originX * 100}% ${originState.originY * 100}%`,
          cursor: isCursor ? getCursorStyle(scaleState.styleScale) : "none",
        }}
        onClick={handleZoomInOut}
        aria-label={`Image ${activeIndex + 1}/${imageUrls.length} at ${scaleState.displayScale}%`}
        {...MOTION_STYLES}
      />
      {(isCursor || isFocus) && (
        <ViewerTools
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
        >
          {imageUrls.length > 1 && (
            <ViewerTools.Navigation
              key={`${url}-navigation`}
              activeIndex={activeIndex}
              totalImages={imageUrls.length}
              toPreviousImage={toPreviousImage}
              toNextImage={toNextImage}
            />
          )}
          <ViewerTools.Scaler
            key={`${url}-scaler`}
            isFocus={isFocus}
            scaleState={scaleState}
            scaleDispatch={scaleDispatch}
            setIsFocus={setIsFocus}
          />
          <ViewerTools.Download key={`${url}-download`} url={url} />
          <ViewerTools.Close key={`${url}-close`} close={close} />
        </ViewerTools>
      )}
    </div>
  );
};

export default ViewerImage;
