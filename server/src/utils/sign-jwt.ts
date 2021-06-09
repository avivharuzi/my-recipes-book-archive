import * as jsonwebtoken from 'jsonwebtoken';

import { config } from '../config';

export const signJwt = (
  subject: string,
  payload: string | Buffer | object = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { secret, expiresIn } = config.jwt;
    jsonwebtoken.sign(
      payload,
      secret,
      {
        expiresIn: `${expiresIn}s`,
        subject,
      },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else if (!encoded) {
          reject('Failed to sign jwt');
        } else {
          resolve(encoded);
        }
      }
    );
  });
};
