import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {
  message$: Observable<Message>;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.message$ = this.activatedRoute.paramMap.pipe(
      mergeMap(params => this.authService.verify(params.get('token') || '')),
      map(
        () => new SuccessMessage('The account has been verified. Pleas log in.')
      ),
      errorMessageOperator(() => {}, true),
      catchError(error => of(error))
    );
  }
}
