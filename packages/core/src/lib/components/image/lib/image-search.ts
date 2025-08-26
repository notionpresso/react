import { normalizeUrl } from "./normalizers";
import type { Block, ImageArgs } from "../../../types";

export const getVisibleImages = (): string[] => {
  const visibleImages = document.querySelectorAll(
    ".notion-image img:not(.notion-toggle:not(.notion-toggle-open) .notion-image img)",
  );

  return Array.from(visibleImages).map((image) =>
    normalizeUrl((image as HTMLImageElement).src),
  );
};

export const getClickedImageIndex = (clickedUrl: string) => {
  const visibleImages = getVisibleImages();
  const normalizedClickedUrl = normalizeUrl(clickedUrl);

  return visibleImages.findIndex((imgSrc) => {
    const normalizedImgSrc = normalizeUrl(imgSrc);
    return normalizedImgSrc === normalizedClickedUrl;
  });
};

export const findImageCaption = (
  blocks: Block[],
  imageUrl: string,
): string | null => {
  for (const block of blocks) {
    if (block.type === "image") {
      const imageUrlFromBlock =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external?.url;

      if (imageUrlFromBlock === imageUrl) {
        return block.image.caption?.[0]?.plain_text || null;
      }
    }
  }
  return null;
};

export const extractImageUrl = (props: ImageArgs): string | null => {
  switch (props.image.type) {
    case "file":
      return props.image.file.url;
    case "external":
      return props.image.external.url;
    default:
      return null;
  }
};
