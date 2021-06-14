import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { CustomValidators } from '../../../../shared/shared/custom-validators';
import { markAllAsDirty } from '../../../../shared/shared/mark-all-as-dirty';
import { SignUpBody } from '../../sign-up-body';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  @Output() formSubmit: EventEmitter<SignUpBody>;

  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formSubmit = new EventEmitter<SignUpBody>();
    this.signUpForm = formBuilder.group({
      firstName: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(64)],
      ],
      lastName: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(64)],
      ],
      email: [
        '',
        [
          CustomValidators.required,
          CustomValidators.maxLength(255),
          CustomValidators.email,
        ],
      ],
      userName: [
        '',
        [
          CustomValidators.required,
          CustomValidators.minLength(4),
          CustomValidators.maxLength(20),
          CustomValidators.userName,
        ],
      ],
      password: [
        '',
        [
          CustomValidators.required,
          CustomValidators.minLength(8),
          CustomValidators.maxLength(20),
          CustomValidators.password,
        ],
      ],
    });
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.signUpForm.controls));
    if (this.signUpForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.signUpForm.value);
  }
}
