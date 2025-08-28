"use client";
import React from "react";

import { Icons } from "./icons";
import ToolsTooltip from "./tools-tooltip";
import {
  TOOLS_ACTIONS,
  TOOLS_ARIA_DESCRIBEDBY,
  TOOLS_ARIA_HINTS,
  TOOLS_ARIA_LABELS,
} from "./constants";

export interface ToolsCloseProps {
  close: () => void;
  onAnnounce: (message: string) => void;
}

const ToolsClose: React.FC<ToolsCloseProps> = ({ close, onAnnounce }) => {
  return (
    <ToolsTooltip
      className="notion-tools-close"
      content={TOOLS_ACTIONS.CLOSE}
      hint="esc"
      aria={{
        label: TOOLS_ARIA_LABELS.CLOSE,
        describedby: TOOLS_ARIA_DESCRIBEDBY.CLOSE,
        hint: TOOLS_ARIA_HINTS.CLOSE,
      }}
      onClick={() => {
        onAnnounce("Closing image viewer");
        close();
      }}
      icon={<Icons.Close />}
    />
  );
};

export default ToolsClose;
