import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import {
  ErrorMessage,
  Message,
  SuccessMessage,
} from '../../../../shared/shared/message';
import { ResetPasswordBody } from '../../shared/reset-password-body';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  isAllowedToResetPassword$: Observable<boolean>;
  token: string | null;
  message?: Message;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = null;
    this.isAllowedToResetPassword$ = this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        this.token = params.get('token');
        return this.authService.checkResetPassword(this.token || '');
      }),
      map(() => true),
      catchError(error => {
        this.message = new ErrorMessage(error.message);
        throw error;
      })
    );
  }

  onFormSubmit(body: ResetPasswordBody): void {
    if (!this.token) {
      return;
    }
    this.authService.resetPassword(this.token, body).subscribe(
      () => {
        this.message = new SuccessMessage(
          'Your password has been changed successfully.'
        );
      },
      error => {
        this.message = new ErrorMessage(error.message);
      }
    );
  }
}
