import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../modules/auth/auth.service';
import { CookieService } from '../modules/auth/cookie.service';
import { UserService } from '../modules/users/user.service';

export const getUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieService = new CookieService(req, res);
  const accessToken = cookieService.getAccessToken();
  const refreshToken = cookieService.getRefreshToken();
  if (!accessToken && !refreshToken) {
    return next();
  }
  if (!accessToken && refreshToken) {
    try {
      await AuthService.deleteRefreshToken(refreshToken);
    } catch (_) {}
    cookieService.deleteRefreshToken();
    return next();
  }

  let userId: string;
  try {
    userId = await AuthService.getUserIdFromAccessToken(accessToken);
  } catch (error) {
    if (!refreshToken) {
      cookieService.deleteAccessToken();
      return next();
    }

    const loginTokens = await AuthService.updateLoginTokens(refreshToken);
    if (!loginTokens) {
      cookieService.deleteTokens();
      return next();
    }

    cookieService.createTokens(loginTokens);
    userId = loginTokens.userId;
  }

  try {
    res.locals.user = await UserService.getById(userId);
  } catch (_) {}

  next();
};
