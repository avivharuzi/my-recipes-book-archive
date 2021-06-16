import * as bytes from 'bytes';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { getFileExtension } from './get-file-extension';

export class CustomValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    return Validators.required(control) !== null
      ? { required: 'This field is required' }
      : null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    return Validators.email(control) !== null
      ? { email: 'Email is invalid' }
      : null;
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.min(min)(control) !== null
        ? {
            min: `This field must have equal or greater than ${min}`,
          }
        : null;
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.max(max)(control) !== null
        ? {
            max: `This field must have equal or less than ${max}`,
          }
        : null;
    };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.minLength(minLength)(control) !== null
        ? {
            minLength: `This field must have equal or greater than ${minLength} characters`,
          }
        : null;
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.maxLength(maxLength)(control) !== null
        ? {
            maxLength: `This field must have equal or less than ${maxLength} characters`,
          }
        : null;
    };
  }

  static pattern(pattern: string | RegExp, message: string): ValidatorFn {
    return (control: AbstractControl) => {
      return Validators.pattern(pattern)(control) !== null
        ? {
            pattern: message,
          }
        : null;
    };
  }

  static userName(): ValidatorFn {
    return CustomValidators.pattern(
      /^([a-z0-9]|[-._](?![-._])).*$/,
      'Username must to contain only alpha characters, numbers and -._'
    );
  }

  static password(): ValidatorFn {
    return CustomValidators.pattern(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must to contain at least 1 lower case character, 1 uppercase character and 1 number'
    );
  }

  static minFiles(minFiles: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      return files && files.length < minFiles
        ? {
            minFiles: `Too few files, minimum ${minFiles} are expected but ${files.length} are given`,
          }
        : null;
    };
  }

  static maxFiles(maxFiles: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      return files && files.length > maxFiles
        ? {
            maxFiles: `Too many files, maximum ${maxFiles} are allowed but ${files.length} are given`,
          }
        : null;
    };
  }

  static minFileSize(minFileSize: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      if (!files || files.length === 0) {
        return null;
      }
      for (const file of files) {
        const fileSize = file.size;
        const minFileSizeInBytes = bytes.parse(minFileSize);
        if (fileSize < minFileSizeInBytes) {
          const fileSizeFormatted = bytes.format(fileSize);
          const minFileSizeFormatted = bytes.format(minFileSizeInBytes);
          return {
            minFileSize: `Minimum expected size for file ${file.name} is ${minFileSizeFormatted} but ${fileSizeFormatted} detected`,
          };
        }
      }
      return null;
    };
  }

  static maxFileSize(maxFileSize: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      if (!files || files.length === 0) {
        return null;
      }
      for (const file of files) {
        const fileSize = file.size;
        const maxFileSizeInBytes = bytes.parse(maxFileSize);
        if (fileSize > maxFileSizeInBytes) {
          const fileSizeFormatted = bytes.format(fileSize);
          const maxFileSizeFormatted = bytes.format(maxFileSizeInBytes);
          return {
            maxFileSize: `Maximum allowed size for file ${file.name} is ${maxFileSizeFormatted} but ${fileSizeFormatted} detected`,
          };
        }
      }
      return null;
    };
  }

  static allowedFileExtensions(allowedFileExtensions: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      if (!files || files.length === 0) {
        return null;
      }
      for (const file of files) {
        const fileName = file.name;
        const fileExtension = getFileExtension(file.name);
        if (!allowedFileExtensions.includes(fileExtension)) {
          return {
            allowedFileExtensions: `File ${fileName} has an incorrect extension of ${fileExtension}, allowed extensions are: ${allowedFileExtensions.join(
              ', '
            )}`,
          };
        }
      }
      return null;
    };
  }

  static allowedMimetypes(allowedMimetypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = control.value as File[];
      if (!files || files.length === 0) {
        return null;
      }
      for (const file of files) {
        const fileName = file.name;
        const fileMimetype = file.type;
        if (!allowedMimetypes.includes(fileMimetype)) {
          return {
            allowedMimetypes: `File ${fileName} has an incorrect mimetype of ${fileMimetype}, allowed mimetypes are: ${allowedMimetypes.join(
              ', '
            )}`,
          };
        }
      }
      return null;
    };
  }
}
