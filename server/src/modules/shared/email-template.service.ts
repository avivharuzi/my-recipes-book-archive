import { sendEmailWithTemplate } from '../../utils/send-email-with-template';

export interface UserVerificationEmailContext {
  userName: string;
  link: string;
}

export interface PasswordResetEmailContext {
  userName: string;
  link: string;
}

export class EmailTemplateService {
  static async sendUserVerification(
    to: string,
    context: UserVerificationEmailContext
  ): Promise<void> {
    return sendEmailWithTemplate<UserVerificationEmailContext>(
      to,
      'user-verification',
      context
    );
  }

  static async sendPasswordReset(
    to: string,
    context: PasswordResetEmailContext
  ): Promise<void> {
    return sendEmailWithTemplate<PasswordResetEmailContext>(
      to,
      'password-reset',
      context
    );
  }
}
