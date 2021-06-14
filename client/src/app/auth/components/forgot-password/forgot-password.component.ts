import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ErrorMessage,
  Message,
  SuccessMessage,
} from '../../../shared/shared/message';
import { AuthService } from '../../shared/auth.service';
import { ForgotPasswordBody } from '../../shared/forgot-password-body';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  message?: Message;

  constructor(private authService: AuthService) {}

  onFormSubmit(body: ForgotPasswordBody): void {
    this.authService.forgotPassword(body).subscribe(
      () => {
        this.message = new SuccessMessage(
          `An email has been sent to ${body.email} with further instructions.`
        );
      },
      error => {
        this.message = new ErrorMessage(error.message);
      }
    );
  }
}
