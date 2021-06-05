import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';

import { config } from '../config';
import { sendEmail } from './send-email';

export enum EmailTemplateType {
  HTML = 'html',
  Subject = 'subject',
  Text = 'text',
}

export const sendEmailWithTemplate = async <T>(
  to: string,
  templateName: string,
  context: T
): Promise<void> => {
  const filePaths = [
    `${getEmailTemplateFilePath(templateName, EmailTemplateType.Subject)}`,
    `${getEmailTemplateFilePath(templateName, EmailTemplateType.HTML)}`,
    `${getEmailTemplateFilePath(templateName, EmailTemplateType.Text)}`,
  ];

  const getEmailTemplateContentPromises = filePaths.map(filePath =>
    getEmailTemplateContent<T>(filePath, context)
  );

  const [subject, html, text] = await Promise.all(
    getEmailTemplateContentPromises
  );

  return sendEmail(to, { subject, html, text });
};

export const getEmailTemplateFilePath = (
  templateName: string,
  type: EmailTemplateType
): string => {
  return path.join(
    config.emailTemplatesDirectory,
    `${templateName}`,
    `${type}.hbs`
  );
};

export const getEmailTemplateContent = async <T>(
  filePath: string,
  context: T
): Promise<string> => {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const template = handlebars.compile(content);
  return template(context);
};
