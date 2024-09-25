import * as fs from "fs";
import * as path from "path";

async function downloadImage({
  url,
  outputPath,
}: {
  url: string;
  outputPath: string;
}): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  await fs.promises.writeFile(outputPath, Buffer.from(arrayBuffer));

  // Return the Content-Type header
  return response.headers.get("Content-Type") || "";
}

function getFileExtension(contentType: string, originalUrl: string): string {
  // First, try to determine extension from Content-Type
  const mimeToExt: { [key: string]: string } = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
  };

  const ext = mimeToExt[contentType];
  if (ext) return ext;

  // If Content-Type doesn't help, try to extract from the URL
  const urlParts = originalUrl.split("/");
  const filename = urlParts[urlParts.length - 1].split("?")[0];
  const fileExtension = path.extname(filename);
  if (fileExtension) return fileExtension;

  // Default to .jpg if we can't determine the extension
  return ".jpg";
}

export async function updateImageUrls(
  { block, imageDir }: { block: any; imageDir: string },
  imageCounter: { count: number } = { count: 1 },
): Promise<void> {
  if (block.type === "image") {
    const imageType = block.image.type;
    const originalUrl = block.image[imageType].url;
    const imageName = `image_${imageCounter.count}`; // Temporarily without extension
    const tempPath = path.join(imageDir, `${imageName}_temp`);

    try {
      // Download image and get Content-Type
      const contentType = await downloadImage({
        url: originalUrl,
        outputPath: tempPath,
      });

      // Determine file extension
      const extension = getFileExtension(contentType, originalUrl);

      // Rename the file with the correct extension
      const finalPath = path.join(imageDir, `${imageName}${extension}`);
      await fs.promises.rename(tempPath, finalPath);

      const newUrl = `/${imageName}${extension}`;
      // Update the URL in the block
      block.image[imageType].url = newUrl;
      // Increment the counter
      imageCounter.count++;

      console.log(`Image saved: ${finalPath}`);
    } catch (error) {
      console.error(`Failed to process image: ${originalUrl}`, error);
    }
  }

  // Recursively process child blocks
  if (block.blocks) {
    for (const childBlock of block.blocks) {
      await updateImageUrls({ block: childBlock, imageDir }, imageCounter);
    }
  }
}