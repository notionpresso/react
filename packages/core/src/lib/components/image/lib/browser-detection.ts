export const isSafari = (): boolean =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const supportsIntersectionObserver = (): boolean =>
  "IntersectionObserver" in window;
