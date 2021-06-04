import * as jsonwebtoken from 'jsonwebtoken';

import { config } from '../config';

export const verifyJwt = <T extends object>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const { secret } = config.jwt;
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else if (!decoded) {
        reject('Failed to get jwt decoded content');
      } else {
        resolve(decoded as T);
      }
    });
  });
};
