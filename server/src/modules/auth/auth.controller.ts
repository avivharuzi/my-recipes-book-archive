import * as expressAsyncHandler from 'express-async-handler';
import { RequestHandler } from 'express';

import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { transformToClassAndValidate } from '../../utils/transform-to-class-and-validate';
import { UserService } from '../users/user.service';

export class AuthController {
  static user(): RequestHandler {
    return expressAsyncHandler(async (_req, res) => {
      const { user } = res.locals;
      if (user) {
        const userPublicDetails = UserService.getPublicDetails(user);
        res.send(userPublicDetails);
      } else {
        res.send();
      }
    });
  }

  static signUp(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createUserDto = await transformToClassAndValidate<CreateUserDto>(
        CreateUserDto,
        req.body
      );
      await AuthService.signUp(createUserDto);
      res.send();
    });
  }

  static verify(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      await AuthService.verify(req.params.token);
      res.send();
    });
  }

  static resendVerification(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const resendVerificationDto = await transformToClassAndValidate<ResendVerificationDto>(
        ResendVerificationDto,
        req.body
      );
      await AuthService.resendVerification(resendVerificationDto);
      res.send();
    });
  }

  static forgotPassword(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const forgotPasswordDto = await transformToClassAndValidate<ForgotPasswordDto>(
        ForgotPasswordDto,
        req.body
      );
      await AuthService.forgotPassword(forgotPasswordDto);
      res.send();
    });
  }

  static checkResetPassword(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      await AuthService.checkResetPassword(req.params.token);
      res.send();
    });
  }

  static resetPassword(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const resetPasswordDto = await transformToClassAndValidate<ResetPasswordDto>(
        ResetPasswordDto,
        req.body
      );
      await AuthService.resetPassword(req.params.token, resetPasswordDto);
      res.send();
    });
  }

  static login(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const loginDto = await transformToClassAndValidate<LoginDto>(
        LoginDto,
        req.body
      );
      const user = await AuthService.login(loginDto);
      const loginTokens = await AuthService.createLoginTokens(user);
      const cookieService = new CookieService(req, res);
      cookieService.createTokens(loginTokens);
      const userPublicDetails = UserService.getPublicDetails(user);
      res.send(userPublicDetails);
    });
  }

  static logout(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const cookieService = new CookieService(req, res);
      const refreshToken = cookieService.getRefreshToken();
      if (refreshToken) {
        await AuthService.deleteRefreshToken(refreshToken);
      }
      cookieService.deleteTokens();
      res.send();
    });
  }
}
