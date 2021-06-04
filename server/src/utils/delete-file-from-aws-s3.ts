import { config } from '../config';
import { getAwsS3Instance } from './get-aws-s3-instance';

export const deleteFileFromAwsS3 = async (filePath: string): Promise<void> => {
  const { bucketName: Bucket } = config.aws.s3;
  await getAwsS3Instance()
    .deleteObject({
      Bucket,
      Key: filePath,
    })
    .promise();
};
