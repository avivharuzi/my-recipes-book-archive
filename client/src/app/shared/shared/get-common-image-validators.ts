import { ValidatorFn } from '@angular/forms';

import { CustomValidators } from './custom-validators';

export const getCommonImageValidators = (
  maxFiles: number = 1
): ValidatorFn[] => {
  return [
    CustomValidators.maxFiles(maxFiles),
    CustomValidators.maxFileSize('10MB'),
    CustomValidators.allowedFileExtensions(['jpg', 'jpeg', 'png', 'gif']),
    CustomValidators.allowedMimetypes([
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/gif',
    ]),
  ];
};
