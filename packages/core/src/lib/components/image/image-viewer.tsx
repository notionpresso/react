"use client";
import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ViewerOverlay from "./viewer-overlay";
import ViewerImage from "./viewer-image";

import { useCursorVisibility, usePreventScroll } from "./hooks";
import { MOTION_STYLES } from "./constants";

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
      <motion.div
        className="notion-viewer-container"
        role="dialog"
        aria-modal="true"
        aria-label="Image Viewer"
        {...MOTION_STYLES}
      >
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageViewer;
