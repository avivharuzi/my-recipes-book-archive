import { StatusCodes } from 'http-status-codes';

import { defaultErrorMessages } from './default-error-messages';
import { HttpError } from './http-error';

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(
      StatusCodes.UNAUTHORIZED,
      message ?? defaultErrorMessages.unauthorized
    );
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
