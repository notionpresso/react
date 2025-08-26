export const getCursorStyle = (scale: number) => {
  if (scale === 1) {
    return "zoom-in";
  } else if (scale > 1) {
    return "zoom-out";
  } else if (scale < 1) {
    return "zoom-in";
  } else {
    return "zoom-out";
  }
};
