import { S3 } from 'aws-sdk';

import { config } from '../config';

export const getAwsS3Instance = (): S3 => {
  const {
    accessKey: accessKeyId,
    secretKey: secretAccessKey,
    region,
  } = config.aws.s3;
  return new S3({
    accessKeyId,
    secretAccessKey,
    region,
  });
};
