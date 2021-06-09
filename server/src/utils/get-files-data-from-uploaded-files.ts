import { UploadedFile } from 'express-fileupload';

export const getFilesDataFromUploadedFiles = (
  uploadedFiles: UploadedFile | UploadedFile[]
): Buffer[] => {
  let uploadedFilesHandling: UploadedFile[];
  if (Array.isArray(uploadedFiles)) {
    uploadedFilesHandling = uploadedFiles;
  } else {
    uploadedFilesHandling = [uploadedFiles];
  }
  return uploadedFilesHandling.map(uploadedFile => uploadedFile.data);
};
