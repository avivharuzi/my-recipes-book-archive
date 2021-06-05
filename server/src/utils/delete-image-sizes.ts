import { deleteFileFromAwsS3 } from './delete-file-from-aws-s3';
import { ImageSizes } from './create-image-sizes';

export const deleteImageSizes = async (
  imageSizes: ImageSizes
): Promise<void[]> => {
  const paths = Object.values(imageSizes).map(imageSize => imageSize.path);
  const deletePromises = paths.map(path => deleteFileFromAwsS3(path));
  return Promise.all(deletePromises);
};
