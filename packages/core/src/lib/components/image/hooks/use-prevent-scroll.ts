"use client";
import { useEffect } from "react";

import { getGapStyles, getGapWidth } from "../lib";

export const usePreventScroll = (): void => {
  useEffect(() => {
    const styleElement = document.createElement("style");

    document.body.setAttribute("data-scroll-locked", "true");
    const gap = getGapWidth();

    const scrollLockedStyles = getGapStyles(gap);
    styleElement.textContent = scrollLockedStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.body.removeAttribute("data-scroll-locked");
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);
};
