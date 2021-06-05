import { defaultImageSizesWidth } from './default-image-sizes-width';
import { getImageWidth } from './get-image-width';
import { ImageSize, resizeAndSaveImage } from './resize-and-save-image';

export interface ImageSizes {
  thumbnail: ImageSize;
  small: ImageSize;
  medium: ImageSize;
  large: ImageSize;
  original: ImageSize;
}

export const createImageSizes = async (
  input: string | Buffer
): Promise<ImageSizes> => {
  const imageWidth = await getImageWidth(input);

  const imageSizesWidth = {
    ...defaultImageSizesWidth,
    original: imageWidth,
  };

  const imageSizePromises: Promise<ImageSize>[] = Object.entries(
    imageSizesWidth
  ).map(([prefix, width]) => {
    if (width > imageWidth) {
      width = imageWidth;
    }
    return resizeAndSaveImage(input, width, prefix);
  });

  const [thumbnail, small, medium, large, original] = await Promise.all(
    imageSizePromises
  );

  return {
    thumbnail,
    small,
    medium,
    large,
    original,
  };
};
