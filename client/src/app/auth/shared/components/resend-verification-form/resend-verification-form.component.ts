import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomValidators } from '../../../../shared/shared/custom-validators';
import { markAllAsDirty } from '../../../../shared/shared/mark-all-as-dirty';
import { ResendVerificationBody } from '../../resend-verification-body';

@Component({
  selector: 'app-resend-verification-form',
  templateUrl: './resend-verification-form.component.html',
  styleUrls: ['./resend-verification-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerificationFormComponent {
  @Output() submitForm: EventEmitter<ResendVerificationBody>;

  resendVerificationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.submitForm = new EventEmitter<ResendVerificationBody>();
    this.resendVerificationForm = this.formBuilder.group({
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
    markAllAsDirty(Object.values(this.resendVerificationForm.controls));
    if (this.resendVerificationForm.invalid) {
      return;
    }
    this.submitForm.emit(this.resendVerificationForm.value);
  }
}
