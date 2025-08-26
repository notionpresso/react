"use client";
import React from "react";

interface ViewerOverlayProps {
  close: () => void;
  isCursor: boolean;
}

const ViewerOverlay: React.FC<ViewerOverlayProps> = ({ close, isCursor }) => {
  return (
    <div
      className="notion-viewer-overlay"
      onClick={close}
      style={{
        cursor: isCursor ? "default" : "none",
      }}
    />
  );
};

export default ViewerOverlay;
