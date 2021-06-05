import { getMimeType } from './get-mime-type';
import { resizeImage } from './resize-image';
import { saveImage } from './save-image';

export interface ImageSize {
  path: string;
  width: number;
  height: number;
  mimeType: string;
  size: number;
}

export const resizeAndSaveImage = async (
  input: string | Buffer,
  width: number,
  prefix = ''
): Promise<ImageSize> => {
  const resizedImage = await resizeImage(input, width);
  const path = await saveImage(resizedImage, prefix);
  const mimeType = getMimeType(path);

  return {
    path,
    width: resizedImage.width,
    height: resizedImage.height,
    mimeType,
    size: resizedImage.size,
  };
};
