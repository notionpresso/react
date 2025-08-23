"use client";
import React from "react";
import { motion } from "framer-motion";
import { MOTION_STYLES } from "./constants";

interface ViewerOverlayProps {
  close: () => void;
  isCursor: boolean;
}

const ViewerOverlay: React.FC<ViewerOverlayProps> = ({ close, isCursor }) => {
  return (
    <motion.div
      className="notion-viewer-overlay"
      onClick={close}
      style={{
        cursor: isCursor ? "default" : "none",
      }}
      {...MOTION_STYLES}
    />
  );
};

export default ViewerOverlay;
