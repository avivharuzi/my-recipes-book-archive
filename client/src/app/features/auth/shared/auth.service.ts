import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ANONYMOUS_USER } from './anonymous-user';
import { environment } from '../../../../environments/environment';
import { ForgotPasswordBody } from './forgot-password-body';
import { LoginBody } from './login.body';
import { ResendVerificationBody } from './resend-verification-body';
import { ResetPasswordBody } from './reset-password-body';
import { SignUpBody } from './sign-up-body';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;

  private readonly baseAuthApiUrl = `${environment.baseApiUrl}/auth`;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.initUser().subscribe();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable().pipe(filter(user => !!user));
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map(user => !!(user && user.id)));
  }

  get isLoggedOut$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
  }

  signUp(body: SignUpBody): Observable<void> {
    return this.httpClient.post<void>(`${this.baseAuthApiUrl}/sign-up`, body);
  }

  resendVerification(body: ResendVerificationBody): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseAuthApiUrl}/resend-verification`,
      body
    );
  }

  verify(token: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseAuthApiUrl}/verify/${token}`,
      {}
    );
  }

  forgotPassword(body: ForgotPasswordBody): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseAuthApiUrl}/forgot-password`,
      body
    );
  }

  checkResetPassword(token: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseAuthApiUrl}/check-reset-password/${token}`,
      {}
    );
  }

  resetPassword(token: string, body: ResetPasswordBody): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseAuthApiUrl}/reset-password/${token}`,
      body
    );
  }

  login(body: LoginBody): Observable<User> {
    return this.httpClient
      .post<User>(`${this.baseAuthApiUrl}/login`, body)
      .pipe(tap(user => this.userSubject.next(user)));
  }

  logout(): Observable<void> {
    return this.httpClient
      .post<void>(`${this.baseAuthApiUrl}/logout`, {})
      .pipe(tap(() => this.userSubject.next(ANONYMOUS_USER)));
  }

  private initUser(): Observable<User | void> {
    return this.httpClient.get<User | void>(`${this.baseAuthApiUrl}/user`).pipe(
      tap(user =>
        user
          ? this.userSubject.next(user)
          : this.userSubject.next(ANONYMOUS_USER)
      ),
      catchError(error => {
        this.userSubject.next(ANONYMOUS_USER);
        throw error;
      })
    );
  }
}
