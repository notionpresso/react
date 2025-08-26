interface GapOffset {
  left: number;
  top: number;
  right: number;
  gap: number;
}

const zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};

const MIN_GAP = 0;

const parse = (x: string | null) => parseInt(x || "", 10) || 0;

export const getOffset = (): number[] => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return [0, 0, 0];
  }

  const cs = window.getComputedStyle(document.body);

  const left = cs["marginLeft"];
  const top = cs["marginTop"];
  const right = cs["marginRight"];

  return [parse(left), parse(top), parse(right)];
};

export const getGapWidth = (): GapOffset => {
  if (typeof window === "undefined") {
    return zeroGap;
  }

  const offsets = getOffset();
  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;

  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(
      MIN_GAP,
      windowWidth - documentWidth + offsets[2] - offsets[0],
    ),
  };
};

export const getGapStyles = ({ gap }: GapOffset) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "";
  }

  const bodyStyle = window.getComputedStyle(document.body);
  const originalMarginLeft = bodyStyle.marginLeft;
  const originalMarginTop = bodyStyle.marginTop;
  const originalMarginRight = bodyStyle.marginRight;

  return `
    body[data-scroll-locked] {
      margin-left: ${originalMarginLeft} !important;
      margin-top: ${originalMarginTop} !important;
      margin-right: ${originalMarginRight + gap}px !important;
      overflow: hidden !important;
      overscroll-behavior: contain;
      position: relative !important;
    }
  `;
};
