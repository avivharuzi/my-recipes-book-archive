import { createRandomToken } from '../../utils/create-random-token';
import { TokenModel, TokenType } from '../tokens/token.model';

export const createRefreshToken = async (userId: string): Promise<string> => {
  const token = await createRandomToken();
  await TokenModel.create({
    user: userId,
    token,
    type: TokenType.RefreshAuth,
  });
  return token;
};
