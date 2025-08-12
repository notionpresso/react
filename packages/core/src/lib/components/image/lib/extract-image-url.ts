import type { ContextedBlock } from "../../../types";

export const extractImageUrl = (block: ContextedBlock): string | null => {
  if (block.type !== "image") return null;

  const { image } = block;

  switch (image.type) {
    case "file":
      return image.file.url || null;
    case "external":
      return image.external.url || null;
    default:
      return null;
  }
};
