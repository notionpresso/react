import {
  BREAKPOINTS,
  LANDSCAPE_RATIOS,
  MAX_HEIGHT_RATIO,
  PORTRAIT_RATIOS,
} from "../constants";

export const getViewport = () => {
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
const getRatio = (aspectRatio: number, viewportWidth: number): number => {
  const isPortrait = aspectRatio < 1.0;
  const ratios = isPortrait ? PORTRAIT_RATIOS : LANDSCAPE_RATIOS;

  if (viewportWidth >= BREAKPOINTS.DESKTOP) {
    return ratios.DESKTOP;
  }

  if (viewportWidth >= BREAKPOINTS.TABLET) {
    const t =
      (viewportWidth - BREAKPOINTS.TABLET) /
      (BREAKPOINTS.DESKTOP - BREAKPOINTS.TABLET);
    return ratios.TABLET + t * (ratios.DESKTOP - ratios.TABLET);
  }

  const t =
    (viewportWidth - BREAKPOINTS.MOBILE) /
    (BREAKPOINTS.TABLET - BREAKPOINTS.MOBILE);
  return ratios.MOBILE + t * (ratios.TABLET - ratios.MOBILE);
};

export const getMaxSize = (
  naturalWidth: number,
  naturalHeight: number,
  viewportWidth: number,
  viewportHeight: number,
) => {
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
