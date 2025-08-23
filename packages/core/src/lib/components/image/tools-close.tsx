"use client";
import React from "react";

import { TOOLS_ACTIONS, TOOLS_ARIA_LABELS } from "./constants/viewer-tools";
import { Icons } from "./icons";
import ToolsTooltip from "./tools-tooltip";

export interface ToolsCloseProps {
  close: () => void;
}

const ToolsClose: React.FC<ToolsCloseProps> = ({ close }) => {
  return (
    <ToolsTooltip
      className="notion-tools-close"
      content={TOOLS_ACTIONS.CLOSE}
      hint="esc"
      aria={{ label: TOOLS_ARIA_LABELS.CLOSE }}
      onClick={close}
      icon={<Icons.Close />}
    />
  );
};

export default ToolsClose;
