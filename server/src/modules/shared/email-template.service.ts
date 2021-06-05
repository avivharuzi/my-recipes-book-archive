import { sendEmailWithTemplate } from '../../utils/send-email-with-template';

export interface UserVerificationContext {
  firstName: string;
  lastName: string;
  link: string;
}

export class EmailTemplateService {
  static async sendUserVerification(
    to: string,
    context: UserVerificationContext
  ): Promise<void> {
    return sendEmailWithTemplate<UserVerificationContext>(
      to,
      'user-verification',
      context
    );
  }
}
