import { LocaleType } from '@/shared/decorator/locale.decorator';
import { ConfigService } from '@nestjs/config';
type Subjects = 'account deletion confirmation' | 'welcome' | 'reset password' | 'password has changed' | 'email has changed' | 'account was deleted';
export declare class ResendService {
    private readonly configService;
    private resend;
    constructor(configService: ConfigService);
    sendEmail({ to, subject, token, locale, name, }: {
        to: string;
        subject: Subjects;
        token?: string;
        locale: LocaleType;
        name?: string;
        email?: string;
    }): Promise<void>;
    private generateHtmlBySubject;
    private getTemplateNameBySubject;
}
export {};
