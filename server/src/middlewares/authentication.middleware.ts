import { NextFunction, Request, Response } from 'express';

import { Unauthorized } from '../errors/unauthorized';

export const authenticationMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    return next();
  }
  next(new Unauthorized());
};
