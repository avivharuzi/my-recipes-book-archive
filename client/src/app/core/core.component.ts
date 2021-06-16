import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../features/auth/shared/auth.service';
import { User } from '../features/auth/shared/user';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
  }

  onLogout(): void {
    this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/']).then());
  }
}
