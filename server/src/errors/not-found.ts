import { StatusCodes } from 'http-status-codes';

import { defaultErrorMessages } from './default-error-messages';
import { HttpError } from './http-error';

export class NotFound extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message ?? defaultErrorMessages.notFound);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
