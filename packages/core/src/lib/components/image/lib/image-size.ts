import {
  BREAKPOINTS,
  LANDSCAPE_RATIOS,
  MAX_HEIGHT_RATIO,
  PORTRAIT_RATIOS,
} from "../constants";

interface Viewport {
  width: number;
  height: number;
}

export const getViewport = (): Viewport => {
  if (window.visualViewport?.width) {
    return {
      width: Math.round(window.visualViewport.width),
      height: Math.round(window.visualViewport.height),
    };
  }

  return {
    width: Math.round(document.documentElement.clientWidth ?? 0),
    height: Math.round(document.documentElement.clientHeight ?? 0),
  };
};

const getNormalizedWidthProgress = (
  viewportWidth: number,
  minWidth: number,
  maxWidth: number,
): number => {
  if (maxWidth === minWidth) return 0;
  const progress = (viewportWidth - minWidth) / (maxWidth - minWidth);
  return Math.min(1, Math.max(0, progress));
};

const getRatio = (aspectRatio: number, viewportWidth: number): number => {
  const isPortrait = aspectRatio < 1.0;
  const ratios = isPortrait ? PORTRAIT_RATIOS : LANDSCAPE_RATIOS;

  if (viewportWidth >= BREAKPOINTS.DESKTOP) {
    return ratios.DESKTOP;
  }

  if (viewportWidth >= BREAKPOINTS.TABLET) {
    const tabletToDesktop = getNormalizedWidthProgress(
      viewportWidth,
      BREAKPOINTS.TABLET,
      BREAKPOINTS.DESKTOP,
    );
    return ratios.TABLET + tabletToDesktop * (ratios.DESKTOP - ratios.TABLET);
  }

  const mobileToTablet = getNormalizedWidthProgress(
    viewportWidth,
    BREAKPOINTS.MOBILE,
    BREAKPOINTS.TABLET,
  );
  return ratios.MOBILE + mobileToTablet * (ratios.TABLET - ratios.MOBILE);
};

interface MaxSize {
  maxWidth: number;
  maxHeight: number;
}

export const getMaxSize = (
  naturalWidth: number,
  naturalHeight: number,
  viewportWidth: number,
  viewportHeight: number,
): MaxSize => {
  const aspectRatio = naturalWidth / naturalHeight;

  if (viewportWidth <= BREAKPOINTS.MOBILE) {
    let maxWidth = viewportWidth;
    let maxHeight = maxWidth / aspectRatio;

    const maxAllowedHeight = viewportHeight * MAX_HEIGHT_RATIO;
    if (maxHeight > maxAllowedHeight) {
      maxHeight = maxAllowedHeight;
      maxWidth = maxHeight * aspectRatio;
    }

    return { maxWidth, maxHeight };
  }

  const viewportRatio = getRatio(aspectRatio, viewportWidth);
  let maxWidth = viewportWidth * viewportRatio;
  let maxHeight = maxWidth / aspectRatio;

  const maxAllowedHeight = viewportHeight * MAX_HEIGHT_RATIO;
  if (maxHeight > maxAllowedHeight) {
    maxHeight = maxAllowedHeight;
    maxWidth = maxHeight * aspectRatio;
  }

  return { maxWidth, maxHeight };
};
