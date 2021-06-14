import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomValidators } from '../../../../shared/shared/custom-validators';
import { markAllAsDirty } from '../../../../shared/shared/mark-all-as-dirty';
import { ForgotPasswordBody } from '../../forgot-password-body';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordFormComponent {
  @Output() formSubmit: EventEmitter<ForgotPasswordBody>;

  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formSubmit = new EventEmitter<ForgotPasswordBody>();
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          CustomValidators.required,
          CustomValidators.maxLength(255),
          CustomValidators.email,
        ],
      ],
    });
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.forgotPasswordForm.controls));
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.forgotPasswordForm.value);
  }
}
