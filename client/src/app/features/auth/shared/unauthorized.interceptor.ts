import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          const authService = this.injector.get<AuthService>(AuthService);
          authService.setAnonymousUser();
          this.router.navigate(['/auth/login']).then();
        }
        throw error;
      })
    );
  }
}
