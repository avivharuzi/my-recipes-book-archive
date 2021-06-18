import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../../auth/shared/auth.service';
import { errorMessageOperator } from '../../../../shared/shared/error-message-operator';
import { Message, SuccessMessage } from '../../../../shared/shared/message';
import { SettingService } from '../../shared/setting.service';
import { User } from '../../../auth/shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  isLoading: boolean;
  message$: Subject<Message>;
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.isLoading = false;
    this.message$ = new Subject<Message>();
    this.user$ = this.authService.user$;
  }

  onFormSubmit(formData: FormData): void {
    this.isLoading = true;
    this.settingService
      .updateDetails(formData)
      .pipe(
        errorMessageOperator(message => this.message$.next(message)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.message$.next(new SuccessMessage('Profile updated successfully.'));
      });
  }
}
