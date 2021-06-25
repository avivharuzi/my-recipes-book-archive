import { ExpressFileuploadValidator } from 'express-fileupload-validator';
import { UploadedFile } from 'express-fileupload';

import { BadRequestError } from '../errors/bad-request-error';

export const validateUploadedFilesImages = (
  uploadedFiles: UploadedFile | UploadedFile[],
  maxCount: number
): void => {
  try {
    const expressFileuploadValidator = new ExpressFileuploadValidator({
      minCount: 1,
      maxCount,
      maxSize: '10MB',
      allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      allowedMimetypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
    });
    expressFileuploadValidator.validate(uploadedFiles);
  } catch (error) {
    throw new BadRequestError(error.errors[0]);
  }
};
