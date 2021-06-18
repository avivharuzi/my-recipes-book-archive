import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../auth/shared/auth.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../auth/shared/user';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private readonly baseUserApiUrl = `${environment.baseApiUrl}/user`;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  updateDetails(formData: FormData): Observable<User> {
    return this.httpClient
      .put<User>(`${this.baseUserApiUrl}/details`, formData)
      .pipe(tap(user => this.authService.setUser(user)));
  }
}
