import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
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
  message$: Subject<Message>;
  isFirstError: boolean;
  isResetPasswordSuccessfully: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = null;
    this.message$ = new Subject<Message>();
    this.isFirstError = false;
    this.isResetPasswordSuccessfully = false;
    this.isAllowedToResetPassword$ = this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        this.token = params.get('token');
        return this.authService.checkResetPassword(this.token || '');
      }),
      map(() => true),
      errorMessageOperator(message => {
        this.message$.next(message);
        this.isFirstError = true;
      })
    );
  }

  onFormSubmit(body: ResetPasswordBody): void {
    if (!this.token) {
      return;
    }
    this.authService
      .resetPassword(this.token, body)
      .pipe(errorMessageOperator(message => this.message$.next(message)))
      .subscribe(() => {
        this.message$.next(
          new SuccessMessage('Your password has been changed successfully.')
        );
        this.isResetPasswordSuccessfully = true;
      });
  }
}
