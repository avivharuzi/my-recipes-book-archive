import * as argon2 from 'argon2';

export const verifyPassword = (
  hash: string,
  password: string
): Promise<boolean> => {
  return argon2.verify(hash, password);
};
