import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorMessage, Message } from '../../../../shared/shared/message';
import { AuthService } from '../../shared/auth.service';
import { LoginBody } from '../../shared/login.body';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  message?: Message;

  constructor(private authService: AuthService, private router: Router) {}

  onFormSubmit(body: LoginBody): void {
    this.authService.login(body).subscribe(
      () => {
        this.router.navigate(['/']).then();
      },
      error => {
        this.message = new ErrorMessage(error.message);
      }
    );
  }
}
