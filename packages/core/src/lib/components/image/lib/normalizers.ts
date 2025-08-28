export const normalizeDisplayScale = (scale: number) => {
  const roundedScale = Math.round(scale / 50) * 50;
  return Math.min(Math.max(roundedScale, 50), 200);
};

export const normalizeUrl = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const urlObj = new URL(url);

      if (urlObj.origin === window.location.origin) {
        return urlObj.pathname;
      } else {
        return url;
      }
    } catch {
      return url;
    }
  }

  return url;
};
