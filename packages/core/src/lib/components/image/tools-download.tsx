"use client";
import React from "react";
import ToolsTooltip from "./tools-tooltip";

import { Icons } from "./icons";
import {
  TOOLS_ACTIONS,
  TOOLS_ARIA_DESCRIBEDBY,
  TOOLS_ARIA_HINTS,
  TOOLS_ARIA_LABELS,
} from "./constants";
import { handleDownload } from "./lib";

export interface ToolsDownloadProps {
  url: string;
  onAnnounce: (message: string) => void;
}

const ToolsDownload: React.FC<ToolsDownloadProps> = ({ url, onAnnounce }) => {
  return (
    <ToolsTooltip
      className="notion-tools-download"
      content={TOOLS_ACTIONS.DOWNLOAD}
      aria={{
        label: TOOLS_ARIA_LABELS.DOWNLOAD,
        describedby: TOOLS_ARIA_DESCRIBEDBY.DOWNLOAD,
        hint: TOOLS_ARIA_HINTS.DOWNLOAD,
      }}
      onClick={() => {
        onAnnounce("Downloading image");
        handleDownload(url);
      }}
      icon={<Icons.Download />}
    />
  );
};

export default ToolsDownload;
