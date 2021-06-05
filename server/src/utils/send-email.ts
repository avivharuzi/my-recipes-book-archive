import * as nodemailer from 'nodemailer';

import { config } from '../config';

export interface SendEmailOptions {
  subject: string;
  html: string;
  text: string;
}

export const sendEmail = async (
  to: string,
  { subject, html, text }: SendEmailOptions
): Promise<void> => {
  const { host, port, user, pass, from } = config.smtp;

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
    secure: port === 465,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from,
    to,
    subject,
    html,
    text,
  };

  await transporter.sendMail(options);
};
