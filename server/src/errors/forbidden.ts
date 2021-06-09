import { StatusCodes } from 'http-status-codes';

import { defaultErrorMessages } from './default-error-messages';
import { HttpError } from './http-error';

export class Forbidden extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.FORBIDDEN, message ?? defaultErrorMessages.forbidden);
    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}
