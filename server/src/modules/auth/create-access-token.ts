import { signJwt } from '../../utils/sign-jwt';

export const createAccessToken = (userId: string): Promise<string> => {
  return signJwt(userId);
};
