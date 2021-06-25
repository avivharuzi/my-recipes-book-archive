import { BadRequestError } from '../../errors/bad-request-error';
import { createRandomToken } from '../../utils/create-random-token';
import { Token, TokenModel, TokenType } from './token.model';
import { User } from '../users/user.model';

export class TokenService {
  static async create(user: User, type: TokenType): Promise<Token> {
    const token = await createRandomToken();
    return TokenModel.create({
      user: user.id,
      token,
      type,
    });
  }

  static async update(id: string): Promise<Token | null> {
    const token = await createRandomToken();
    return TokenModel.findByIdAndUpdate(
      id,
      {
        token,
      },
      { new: true }
    ).populate('user');
  }

  static async getByToken(
    token: string,
    type: TokenType
  ): Promise<Token | null> {
    return TokenModel.findOne({
      token,
      type,
    }).populate('user');
  }

  static async getByTokenAndValidate(
    token: string,
    type: TokenType
  ): Promise<Token> {
    const details = await TokenService.getByToken(token, type);
    if (!details || details.isExpired()) {
      throw new BadRequestError(
        'We were unable to find a valid token. Your token my have expired.'
      );
    }
    return details;
  }

  static async getByUser(user: User, type: TokenType): Promise<Token | null> {
    return TokenModel.findOne({
      user: user.id,
      type,
    }).populate('user');
  }

  static async getByUserAndCreateOrUpdate(
    user: User,
    type: TokenType
  ): Promise<Token | null> {
    const details = await TokenService.getByUser(user, type);
    if (!details) {
      return TokenService.create(user, TokenType.PasswordReset);
    } else {
      return TokenService.update(details.id);
    }
  }

  static async delete(id: string): Promise<void> {
    await TokenModel.findByIdAndDelete(id);
  }

  static async deleteByToken(token: string, type: TokenType): Promise<void> {
    await TokenModel.findOneAndDelete({
      token,
      type,
    });
  }
}
