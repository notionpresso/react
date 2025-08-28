"use client";
import React from "react";
import ToolsTooltip from "./tools-tooltip";

import {
  TOOLS_ACTIONS,
  TOOLS_ARIA_DESCRIBEDBY,
  TOOLS_ARIA_HINTS,
  TOOLS_ARIA_LABELS,
} from "./constants";
import { Icons } from "./icons";

const NEXT_IMAGE_INDEX = 2;

export interface ToolsNavigationProps {
  activeIndex: number;
  totalImages: number;
  toPreviousImage: () => void;
  toNextImage: () => void;
}
const ToolsNavigation: React.FC<ToolsNavigationProps> = ({
  activeIndex,
  totalImages,
  toPreviousImage,
  toNextImage,
}) => {
  const hasNext = activeIndex < totalImages - 1;
  const hasPrevious = activeIndex > 0;

  return (
    <div className="notion-tools-navigation">
      <ToolsTooltip
        className="notion-tools-navigation-back"
        content={TOOLS_ACTIONS.BACK}
        hint={`${activeIndex} of ${totalImages}`}
        aria={{
          label: TOOLS_ARIA_LABELS.BACK,
          describedby: TOOLS_ARIA_DESCRIBEDBY.BACK,
          hint: TOOLS_ARIA_HINTS.BACK,
        }}
        disabled={!hasPrevious}
        onClick={toPreviousImage}
        icon={<Icons.ArrowBack />}
      />

      <ToolsTooltip
        className="notion-tools-navigation-next"
        content={TOOLS_ACTIONS.NEXT}
        hint={`${activeIndex + NEXT_IMAGE_INDEX} of ${totalImages}`}
        aria={{
          label: TOOLS_ARIA_LABELS.NEXT,
          describedby: TOOLS_ARIA_DESCRIBEDBY.NEXT,
          hint: TOOLS_ARIA_HINTS.NEXT,
        }}
        disabled={!hasNext}
        onClick={toNextImage}
        icon={<Icons.ArrowForward />}
      />
    </div>
  );
};

export default ToolsNavigation;
