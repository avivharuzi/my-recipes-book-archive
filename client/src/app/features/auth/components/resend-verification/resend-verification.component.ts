import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
import { ResendVerificationBody } from '../../shared/resend-verification-body';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerificationComponent {
  message$: Subject<Message>;
  isResendVerificationSuccessfully: boolean;

  constructor(private authService: AuthService) {
    this.message$ = new Subject<Message>();
    this.isResendVerificationSuccessfully = false;
  }

  onFormSubmit(body: ResendVerificationBody): void {
    this.authService
      .resendVerification(body)
      .pipe(errorMessageOperator(message => this.message$.next(message)))
      .subscribe(() => {
        this.message$.next(
          new SuccessMessage(
            `A verification email has been sent to ${body.email}.`
          )
        );
      });
  }
}
