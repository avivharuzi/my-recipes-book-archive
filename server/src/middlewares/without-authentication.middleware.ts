import { NextFunction, Request, Response } from 'express';

import { Forbidden } from '../errors/forbidden';

export const withoutAuthenticationMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    return next(new Forbidden());
  }
  next();
};
