import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtDecoded } from './jwt-decoded';
import { LoginDto } from './dto/login.dto';
import { LoginTokens } from './login-tokens';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { signJwt } from '../../utils/sign-jwt';
import { TokenService } from '../tokens/token.service';
import { TokenType } from '../tokens/token.model';
import { UpdateLoginTokens } from './update-login-tokens';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';
import { verifyJwt } from '../../utils/verify-jwt';

export class AuthService {
  static async signUp(createUserDto: CreateUserDto): Promise<void> {
    await UserService.create(createUserDto);
  }

  static async verify(token: string): Promise<void> {
    await UserService.verify(token);
  }

  static async resendVerification(
    resendVerificationDto: ResendVerificationDto
  ): Promise<void> {
    await UserService.resendVerification(resendVerificationDto);
  }

  static async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto
  ): Promise<void> {
    await UserService.forgotPassword(forgotPasswordDto);
  }

  static async checkResetPassword(token: string): Promise<void> {
    await UserService.checkResetPassword(token);
  }

  static async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDto
  ): Promise<void> {
    await UserService.resetPassword(token, resetPasswordDto);
  }

  static async login(loginDto: LoginDto): Promise<User> {
    return UserService.login(loginDto);
  }

  static async createLoginTokens(user: User): Promise<LoginTokens> {
    const userId = user.id;
    const accessToken = await signJwt(userId);
    const { token: refreshToken } = await TokenService.create(
      user,
      TokenType.RefreshAuth
    );
    return { accessToken, refreshToken };
  }

  static async deleteRefreshToken(refreshToken: string): Promise<void> {
    await TokenService.deleteByToken(refreshToken, TokenType.RefreshAuth);
  }

  static async getUserIdFromAccessToken(accessToken: string): Promise<string> {
    const { sub } = await verifyJwt<JwtDecoded>(accessToken);
    return sub;
  }

  static async updateLoginTokens(
    refreshToken: string
  ): Promise<UpdateLoginTokens | null> {
    const token = await TokenService.getByToken(
      refreshToken,
      TokenType.RefreshAuth
    );
    if (!token || token.isExpired()) {
      if (token && token.isExpired()) {
        await TokenService.delete(token.id);
      }
      return null;
    }

    const newRefreshToken = await TokenService.update(token.id);
    if (!newRefreshToken) {
      return null;
    }

    const userId = newRefreshToken.user.id;
    const accessToken = await signJwt(userId);
    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      userId,
    };
  }
}
