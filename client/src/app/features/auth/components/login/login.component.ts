import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { LoginBody } from '../../shared/login.body';
import { Message } from '../../../../shared/shared/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  message$: Subject<Message>;
  isLoading: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.message$ = new Subject<Message>();
    this.isLoading = false;
  }

  onFormSubmit(body: LoginBody): void {
    this.isLoading = true;
    this.authService
      .login(body)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.router.navigate(['/']).then();
      });
  }
}
