export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const supportsIntersectionObserver = () =>
  "IntersectionObserver" in window;
