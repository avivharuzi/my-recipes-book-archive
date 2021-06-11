import { BadRequest } from '../../errors/bad-request';
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

  static async findByToken(
    token: string,
    type: TokenType
  ): Promise<Token | null> {
    return TokenModel.findOne({
      token,
      type,
    }).populate('user');
  }

  static async findByTokenAndValidate(
    token: string,
    type: TokenType
  ): Promise<Token> {
    const details = await TokenService.findByToken(token, type);
    if (!details || details.isExpired()) {
      throw new BadRequest(
        'We were unable to find a valid token. Your token my have expired.'
      );
    }
    return details;
  }

  static async findByUser(user: User, type: TokenType): Promise<Token | null> {
    return TokenModel.findOne({
      user: user.id,
      type,
    }).populate('user');
  }

  static async findByUserAndCreateOrUpdate(
    user: User,
    type: TokenType
  ): Promise<Token | null> {
    const details = await TokenService.findByUser(user, type);
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
