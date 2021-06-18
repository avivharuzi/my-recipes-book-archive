import { Observable } from 'rxjs';

import { ErrorMessage, Message } from './message';
import { catchError } from 'rxjs/operators';

export const errorMessageOperator = (
  cb: (message: Message) => void,
  throwErrorMessage = false
) => {
  return <T>(observable: Observable<T>): Observable<T> => {
    return observable.pipe(
      catchError(error => {
        let message: string;
        if (error.error?.message) {
          message = error.error.message;
        } else {
          message = 'An error has occurred. Please try again later.';
        }
        const errorMessage = new ErrorMessage(message);
        cb(errorMessage);
        if (throwErrorMessage) {
          throw errorMessage;
        }
        throw error;
      })
    );
  };
};
