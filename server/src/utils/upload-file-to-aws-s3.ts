import * as uuid from 'uuid';

import { config } from '../config';
import { getAwsS3Instance } from './get-aws-s3-instance';

export interface UploadFile {
  name?: string;
  prefix?: string;
  extension: string;
  data: Buffer;
}

export const uploadFileToAwsS3 = async (
  mainDirectory: string,
  uploadFile: UploadFile
): Promise<string> => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const prefix = uploadFile.prefix ? `${uploadFile.prefix}.` : '';
  const name = uploadFile.name ?? uuid.v4();
  const filePath = `${mainDirectory}/${year}/${month}/${day}/${name}.${prefix}${uploadFile.extension}`;

  const { bucketName: Bucket } = config.aws.s3;
  await getAwsS3Instance()
    .upload({
      Bucket,
      Key: filePath,
      Body: uploadFile.data,
    })
    .promise();

  return filePath;
};
