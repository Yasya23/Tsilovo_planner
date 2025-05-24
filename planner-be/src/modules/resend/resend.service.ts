import { LocaleType } from '@/shared/decorator/locale.decorator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { Resend } from 'resend';

type Subjects =
  | 'account deletion confirmation'
  | 'welcome'
  | 'reset password'
  | 'password has changed'
  | 'email has changed'
  | 'account was deleted';

@Injectable()
export class ResendService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendEmail({
    to,
    subject,
    token,
    locale,
    name,
  }: {
    to: string;
    subject: Subjects;
    token?: string;
    locale: LocaleType;
    name?: string;
    email?: string;
  }): Promise<void> {
    const html = this.generateHtmlBySubject({
      subject,
      token,
      locale,
      name,
    });
    const appName = locale === 'uk' ? 'Цільово' : 'Tsil`ovo';
    await this.resend.emails.send({
      from: `${appName} <onboarding@resend.dev>`,
      to,
      subject,
      html,
    });
  }

  private generateHtmlBySubject({
    subject,
    token,
    locale,
    name,
  }: {
    subject: string;
    token?: string;
    locale: LocaleType;
    name?: string;
  }): string {
    const templateName = this.getTemplateNameBySubject(subject);
    const filePath = path.resolve(
      process.cwd(),
      'src',
      'modules',
      'resend',
      'mail-templates',
      locale,
      `${templateName}.hbs`,
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`Email template not found: ${filePath}`);
    }

    const templateSource = fs.readFileSync(filePath, 'utf-8');
    const template = Handlebars.compile(templateSource);

    const urlBase = this.configService.get<string>('FRONTEND_URL');
    const supportEmail = this.configService.get<string>('SUPPORT_EMAIL');

    const url =
      subject === 'account deletion confirmation'
        ? `${urlBase}/confirm-delete?token=${token}`
        : subject === 'reset password'
          ? `${urlBase}/reset-password?token=${token}`
          : undefined;

    return template({
      subject,
      token,
      url,
      name,
      email: supportEmail,
    });
  }

  private getTemplateNameBySubject(subject: string): string {
    switch (subject.toLowerCase()) {
      case 'account deletion confirmation':
        return 'account-deletion-confirmation';
      case 'welcome':
        return 'welcome';
      case 'reset password':
        return 'reset-password';
      case 'password has changed':
        return 'password-has-changed';
      case 'email has changed':
        return 'email-has-changed';
      case 'account was deleted':
        return 'account-was-deleted';
      default:
        throw new Error(`Unhandled subject: ${subject}`);
    }
  }
}
