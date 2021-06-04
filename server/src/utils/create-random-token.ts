import * as crypto from 'crypto';

export const createRandomToken = (length = 128): Promise<string> => {
  return new Promise((resolve, reject) => {
    const size = length / 2;
    crypto.randomBytes(size, (error, buffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
};
