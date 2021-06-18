import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
import { ResendVerificationBody } from '../../shared/resend-verification-body';

@Component({
  selector: 'app-resend-verification',
  templateUrl: './resend-verification.component.html',
  styleUrls: ['./resend-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerificationComponent {
  message$: Subject<Message>;
  isResendVerificationSuccessfully: boolean;
  isLoading: boolean;

  constructor(private authService: AuthService) {
    this.message$ = new Subject<Message>();
    this.isResendVerificationSuccessfully = false;
    this.isLoading = false;
  }

  onFormSubmit(body: ResendVerificationBody): void {
    this.isLoading = true;
    this.authService
      .resendVerification(body)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.message$.next(
          new SuccessMessage(
            `A verification email has been sent to ${body.email}.`
          )
        );
      });
  }
}
