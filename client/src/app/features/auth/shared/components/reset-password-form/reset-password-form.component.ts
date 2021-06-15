import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../../../../shared/shared/custom-validators';
import { markAllAsDirty } from '../../../../../shared/shared/mark-all-as-dirty';

import { AuthService } from '../../auth.service';
import { ResetPasswordBody } from '../../reset-password-body';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent {
  @Output() formSubmit: EventEmitter<ResetPasswordBody>;

  resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formSubmit = new EventEmitter<ResetPasswordBody>();
    this.resetPasswordForm = this.formBuilder.group({
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
    markAllAsDirty(Object.values(this.resetPasswordForm.controls));
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.resetPasswordForm.value);
  }
}
