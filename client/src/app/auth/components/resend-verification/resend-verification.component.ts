import { Component } from '@angular/core';

import { AuthService } from '../../shared/auth.service';
import {
  ErrorMessage,
  Message,
  SuccessMessage,
} from '../../../shared/shared/message';
import { ResendVerificationBody } from '../../shared/resend-verification-body';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.scss'],
})
export class ResendVerificationComponent {
  message?: Message;

  constructor(private authService: AuthService) {}

  onFormSubmit(body: ResendVerificationBody): void {
    this.authService.resendVerification(body).subscribe(
      () => {
        this.message = new SuccessMessage(
          `A verification email has been sent to ${body.email}.`
        );
      },
      error => {
        this.message = new ErrorMessage(error.message);
      }
    );
  }
}
