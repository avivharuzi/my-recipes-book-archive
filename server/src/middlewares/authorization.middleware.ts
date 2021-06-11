import { NextFunction, Request, Response } from 'express';

import { Forbidden } from '../errors/forbidden';
import { UserRole } from '../modules/users/user.model';

export const authorizationMiddleware = (allowedUserRoles: UserRole[]) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const userRoles = res.locals.user.roles;
    const commonRoles = allowedUserRoles.filter(allowedUserRole =>
      userRoles.includes(allowedUserRole)
    );
    if (commonRoles.length > 0) {
      return next();
    }
    next(new Forbidden());
  };
};
