import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
import { SignUpBody } from '../../shared/sign-up-body';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  isSignUpSuccessfully: boolean;
  message$: Subject<Message>;
  isLoading: boolean;

  constructor(private authService: AuthService) {
    this.isSignUpSuccessfully = false;
    this.message$ = new Subject<Message>();
    this.isLoading = false;
  }

  onFormSubmit(body: SignUpBody): void {
    this.isLoading = true;
    this.authService
      .signUp(body)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.message$.next(
          new SuccessMessage(
            `Account created successfully. A verification email has been sent to ${body.email}.`
          )
        );
        this.isSignUpSuccessfully = true;
      });
  }
}
