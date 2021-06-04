import { ResizedImage } from './resize-image';
import { uploadFileToAwsS3 } from './upload-file-to-aws-s3';

export const saveImage = async (
  resizedImage: ResizedImage,
  prefix?: string
): Promise<string> => {
  return await uploadFileToAwsS3('images', {
    prefix,
    extension: resizedImage.extension,
    data: resizedImage.data,
  });
};
