"use client";
import React from "react";

import { Icons } from "./icons";
import ToolsTooltip from "./tools-tooltip";
import {
  TOOLS_ACTIONS,
  TOOLS_ARIA_LABELS,
  TOOLS_ARIA_CONTROLS,
} from "./constants";

export interface ToolsCloseProps {
  close: () => void;
}

const ToolsClose: React.FC<ToolsCloseProps> = ({ close }) => {
  return (
    <ToolsTooltip
      className="notion-tools-close"
      content={TOOLS_ACTIONS.CLOSE}
      hint="esc"
      aria={{
        label: TOOLS_ARIA_LABELS.CLOSE,
        controls: TOOLS_ARIA_CONTROLS.IMAGE_VIEWER,
      }}
      onClick={close}
      icon={<Icons.Close />}
    />
  );
};

export default ToolsClose;
