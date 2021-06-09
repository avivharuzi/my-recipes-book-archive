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

export class AuthController {
  static signUp(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const createUserDto = await transformToClassAndValidate<CreateUserDto>(
        CreateUserDto,
        req.body
      );
      await AuthService.signUp(createUserDto);
      return res.send();
    });
  }

  static verify(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const token = req.params.token;
      await AuthService.verify(token);
      return res.send();
    });
  }

  static resendVerification(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const resendVerificationDto = await transformToClassAndValidate<ResendVerificationDto>(
        ResendVerificationDto,
        req.body
      );
      await AuthService.resendVerification(resendVerificationDto);
      return res.send();
    });
  }

  static forgotPassword(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const forgotPasswordDto = await transformToClassAndValidate<ForgotPasswordDto>(
        ForgotPasswordDto,
        req.body
      );
      await AuthService.forgotPassword(forgotPasswordDto);
      return res.send();
    });
  }

  static resetPassword(): RequestHandler {
    return expressAsyncHandler(async (req, res) => {
      const token = req.params.token;
      const resetPasswordDto = await transformToClassAndValidate<ResetPasswordDto>(
        ResetPasswordDto,
        req.body
      );
      await AuthService.resetPassword(token, resetPasswordDto);
      return res.send();
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
      return res.send(user);
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
      return res.send();
    });
  }
}
