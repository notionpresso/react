import { DISPLAY as DISPLAY_STYLE } from "../reducer";

interface ZoomAnnouncerProps {
  action: "in" | "out";
  displayScale: number;
}

export const getZoomAnnouncer = ({
  action,
  displayScale,
}: ZoomAnnouncerProps): string => {
  const step = DISPLAY_STYLE.STEP;
  const next =
    action === "in"
      ? Math.min(DISPLAY_STYLE.MAX, displayScale + step)
      : Math.max(DISPLAY_STYLE.MIN, displayScale - step);
  return `Zoom ${action} to ${next}%`;
};
