import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ErrorMessage,
  Message,
  SuccessMessage,
} from '../../../../shared/shared/message';
import { AuthService } from '../../shared/auth.service';
import { SignUpBody } from '../../shared/sign-up-body';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  message?: Message;

  constructor(private authService: AuthService) {}

  onFormSubmit(body: SignUpBody): void {
    this.authService.signUp(body).subscribe(
      () => {
        this.message = new SuccessMessage(
          `Account created successfully. A verification email has been sent to ${body.email}.`
        );
      },
      error => {
        this.message = new ErrorMessage(error);
      }
    );
  }
}
