export const TOOLS_ACTIONS = {
  BACK: "Back",
  NEXT: "Next",
  ZOOM_OUT: "Zoom out",
  ZOOM_IN: "Zoom in",
  DOWNLOAD: "Download",
  CLOSE: "Close",
} as const;

export const TOOLS_ARIA_LABELS = {
  BACK: "image tools back button",
  NEXT: "image tools next button",
  ZOOM_OUT: "image tools zoom out button",
  ZOOM_IN: "image tools zoom in button",
  DOWNLOAD: "image download button",
  CLOSE: "image viewer close button",
  SCALER_INPUT: "scaler input",
  IMAGE_VIEWER: "image viewer container",
  TOOLTIP_DESCRIPTION: "tooltip description",
} as const;

export const TOOLS_ARIA_CONTROLS = {
  IMAGE_VIEWER: "image-viewer-container",
  ZOOM_CONTROLS: "zoom-controls-panel",
  NAVIGATION_PANEL: "navigation-panel",
} as const;

export const TOOLS_ARIA_DESCRIBEDBY = {
  ZOOM_OUT: "zoom-out-description",
  ZOOM_IN: "zoom-in-description",
  DOWNLOAD: "download-description",
  CLOSE: "close-description",
  BACK: "back-description",
  NEXT: "next-description",
} as const;
