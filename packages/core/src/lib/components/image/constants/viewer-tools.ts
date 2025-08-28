export const TOOLS_ACTIONS = {
  BACK: "Back",
  NEXT: "Next",
  ZOOM_OUT: "Zoom out",
  ZOOM_IN: "Zoom in",
  DOWNLOAD: "Download",
  CLOSE: "Close",
} as const;

export const TOOLS_ARIA_LABELS = {
  BACK: "Previous image",
  NEXT: "Next image",
  ZOOM_OUT: "Zoom out",
  ZOOM_IN: "Zoom in",
  DOWNLOAD: "Download image",
  CLOSE: "Close viewer",
  SCALER_INPUT: "Scale percentage",
  SCALER_INPUT_BUTTON: "Edit scale",
} as const;

export const TOOLS_ARIA_DESCRIBEDBY = {
  BACK: "previous-image-desc",
  NEXT: "next-image-desc",
  ZOOM_OUT: "zoom-out-desc",
  ZOOM_IN: "zoom-in-desc",
  DOWNLOAD: "download-image-desc",
  CLOSE: "close-viewer-desc",
  SCALER_INPUT: "scale-percentage-desc",
  SCALER_INPUT_BUTTON: "edit-scale-desc",
} as const;

export const TOOLS_ARIA_HINTS = {
  BACK: "Go to previous image (Left Arrow)",
  NEXT: "Go to next image (Right Arrow)",
  ZOOM_OUT: "Zoom out (Minus -)",
  ZOOM_IN: "Zoom in (Plus +)",
  DOWNLOAD: "Download the current image",
  CLOSE: "Close the viewer (Esc)",
  SCALER_INPUT_BUTTON: "Opens scale input. Click to edit",
  SCALER_INPUT: "Enter a scale percentage and press Enter to apply",
} as const;
