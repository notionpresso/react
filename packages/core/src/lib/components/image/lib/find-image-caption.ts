import { type ImageArgs, type Block } from "../../../types";

export const findImageCaption = (
  blocks: Block[],
  imageUrl: string,
): string | null => {
  for (const block of blocks) {
    if (block.type === "image") {
      const imageBlock = block as ImageArgs;
      const url =
        imageBlock.image.type === "file"
          ? imageBlock.image.file.url
          : imageBlock.image.external?.url;

      if (url === imageUrl) {
        return imageBlock.image.caption?.[0]?.text?.content || null;
      }
    }

    if (block.blocks) {
      const caption = findImageCaption(block.blocks, imageUrl);
      if (caption) return caption;
    }
  }

  return null;
};
