import * as path from 'path';

export const config = Object.freeze({
  server: {
    hostname: process.env.SERVER_HOSTNAME ?? '0.0.0.0',
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 8080,
    env: process.env.NODE_ENV ?? 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
  mongodb: {
    uri: process.env.MONGODB_URI ?? '',
  },
  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: process.env.SMTP_PORT ? +process.env.SMTP_PORT : 465,
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.SMTP_FROM ?? '',
  },
  emailTemplatesDirectory: path.join(__dirname, 'email-templates'),
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    expiresIn: process.env.JWT_EXPIRES_IN || 7200,
  },
  aws: {
    s3: {
      accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
      secretKey: process.env.AWS_S3_SECRET_KEY ?? '',
      bucketName: process.env.AWS_S3_BUCKET_NAME ?? '',
      region: process.env.AWS_S3_REGION ?? '',
    },
  },
});
