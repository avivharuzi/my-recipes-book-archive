import { CookieOptions, Request, Response } from 'express';

import { config } from '../../config';
import { CookieName } from './cookie-name';
import { LoginTokens } from './login-tokens';

export class CookieService {
  private req: Request;
  private res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  getAccessToken(): string {
    return this.req.cookies[CookieName.AccessToken];
  }

  getRefreshToken(): string {
    return this.req.cookies[CookieName.RefreshToken];
  }

  createTokens(loginToken: LoginTokens): void {
    this.createAccessToken(loginToken.accessToken);
    this.createRefreshToken(loginToken.refreshToken);
  }

  createAccessToken(accessToken: string): void {
    this.res.cookie(
      CookieName.AccessToken,
      accessToken,
      CookieService.getOptions()
    );
  }

  createRefreshToken(refreshToken: string): void {
    this.res.cookie(
      CookieName.RefreshToken,
      refreshToken,
      CookieService.getOptions()
    );
  }

  deleteTokens(): void {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  }

  deleteAccessToken(): void {
    this.res.clearCookie(CookieName.AccessToken);
  }

  deleteRefreshToken(): void {
    this.res.clearCookie(CookieName.RefreshToken);
  }

  static getOptions(): CookieOptions {
    if (config.server.isProduction) {
      return { httpOnly: true, secure: true, sameSite: 'strict' };
    }
    return {};
  }
}
