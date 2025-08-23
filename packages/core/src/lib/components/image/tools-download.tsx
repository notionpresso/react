"use client";
import React from "react";
import ToolsTooltip from "./tools-tooltip";

import { Icons } from "./icons";
import { TOOLS_ACTIONS, TOOLS_ARIA_LABELS } from "./constants/viewer-tools";
import { handleDownload } from "./lib";

export interface ToolsDownloadProps {
  url: string;
}

const ToolsDownload: React.FC<ToolsDownloadProps> = ({ url }) => {
  return (
    <ToolsTooltip
      className="notion-tools-download"
      content={TOOLS_ACTIONS.DOWNLOAD}
      aria={{ label: TOOLS_ARIA_LABELS.DOWNLOAD }}
      onClick={() => handleDownload(url)}
      icon={<Icons.Download />}
    />
  );
};

export default ToolsDownload;
