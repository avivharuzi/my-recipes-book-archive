import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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
}
