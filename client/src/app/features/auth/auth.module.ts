import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './shared/components/forgot-password-form/forgot-password-form.component';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { ResendVerificationComponent } from './components/resend-verification/resend-verification.component';
import { ResendVerificationFormComponent } from './shared/components/resend-verification-form/resend-verification-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './shared/components/reset-password-form/reset-password-form.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpFormComponent } from './shared/components/sign-up-form/sign-up-form.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ForgotPasswordFormComponent,
    LoginComponent,
    LoginFormComponent,
    ResendVerificationComponent,
    ResendVerificationFormComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    SignUpComponent,
    SignUpFormComponent,
    VerifyComponent,
  ],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
