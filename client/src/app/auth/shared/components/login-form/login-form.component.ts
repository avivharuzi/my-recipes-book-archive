import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomValidators } from '../../../../shared/shared/custom-validators';
import { markAllAsDirty } from '../../../../shared/shared/mark-all-as-dirty';
import { LoginBody } from '../../login.body';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() formSubmit: EventEmitter<LoginBody>;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formSubmit = new EventEmitter<LoginBody>();
    this.loginForm = formBuilder.group({
      emailOrUserName: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(255)],
      ],
      password: [
        '',
        [CustomValidators.required, CustomValidators.maxLength(255)],
      ],
    });
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.loginForm.controls));
    if (this.loginForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.loginForm.value);
  }
}
