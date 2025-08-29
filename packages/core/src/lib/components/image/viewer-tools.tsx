"use client";

import React from "react";
import { motion } from "framer-motion";
import { MOTION_STYLES } from "./constants";

import ToolsScaler, { type ToolsScalerProps } from "./tools-scaler";
import ToolsNavigation, { type ToolsNavigationProps } from "./tools-navigation";
import ToolsDownload, { type ToolsDownloadProps } from "./tools-download";
import ToolsClose, { type ToolsCloseProps } from "./tools-close";

interface ViewerToolsProps {
  children: React.ReactNode;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
}

interface ViewerToolsComponent {
  Scaler: React.FC<ToolsScalerProps>;
  Navigation: React.FC<ToolsNavigationProps>;
  Download: React.FC<ToolsDownloadProps>;
  Close: React.FC<ToolsCloseProps>;
}

const ViewerTools: React.FC<ViewerToolsProps> & ViewerToolsComponent = ({
  children,
  handleMouseLeave,
  handleMouseEnter,
}) => {
  return (
    <motion.nav
      className="notion-viewer-tools"
      {...MOTION_STYLES}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </motion.nav>
  );
};

ViewerTools.Scaler = ToolsScaler;
ViewerTools.Navigation = ToolsNavigation;
ViewerTools.Download = ToolsDownload;
ViewerTools.Close = ToolsClose;

export default ViewerTools;
