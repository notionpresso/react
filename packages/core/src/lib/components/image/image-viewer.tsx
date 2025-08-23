"use client";
import React from "react";

import { AnimatePresence } from "framer-motion";

import ViewerOverlay from "./viewer-overlay";
import ViewerImage from "./viewer-image";

import { useCursorVisibility, usePreventScroll } from "./hooks";

type ImageViewerProps = {
  url: string;
  caption: string;
  close: () => void;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ url, caption, close }) => {
  const { isCursor, handleMouseLeave, handleMouseEnter } =
    useCursorVisibility();

  usePreventScroll();

  return (
    <AnimatePresence>
      <div className="notion-viewer-container">
        <ViewerOverlay
          key={`${url}-overlay`}
          close={close}
          isCursor={isCursor}
        />
        <ViewerImage
          key={`${url}-image`}
          url={url}
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          isCursor={isCursor}
          caption={caption}
          close={close}
        />
      </div>
    </AnimatePresence>
  );
};

export default ImageViewer;
