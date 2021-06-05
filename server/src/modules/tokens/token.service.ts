import { createRandomToken } from '../../utils/create-random-token';
import { TokenModel, TokenType } from './token.model';

export class TokenService {
  static async create(userId: string, type: TokenType) {
    const token = await createRandomToken();
    await TokenModel.create({
      user: userId,
      token,
      type,
    });
    return token;
  }
}
