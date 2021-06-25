import { NextFunction, Request, Response } from 'express';

import { ForbiddenError } from '../errors/forbidden-error';

export const withoutAuthenticationMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    return next(new ForbiddenError());
  }
  next();
};
