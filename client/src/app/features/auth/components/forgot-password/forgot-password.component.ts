import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { ForgotPasswordBody } from '../../shared/forgot-password-body';
import { Message, SuccessMessage } from '../../../../shared/shared/message';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  isForgotPasswordSuccessfully: boolean;
  message$: Subject<Message>;

  constructor(private authService: AuthService) {
    this.isForgotPasswordSuccessfully = false;
    this.message$ = new Subject<Message>();
  }

  onFormSubmit(body: ForgotPasswordBody): void {
    this.authService
      .forgotPassword(body)
      .pipe(errorMessageOperator(message => this.message$.next(message)))
      .subscribe(() => {
        this.message$.next(
          new SuccessMessage(
            `An email has been sent to ${body.email} with further instructions.`
          )
        );
        this.isForgotPasswordSuccessfully = true;
      });
  }
}
