import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto } from './dto';
import { MailService } from '@/modules/mail/mail.service';
import { LocaleType } from '@/shared/decorator/locale.decorator';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    private readonly MailService;
    constructor(authService: AuthService, configService: ConfigService, MailService: MailService);
    login(dto: AuthDto, res: Response): Promise<{
        message: string;
    }>;
    register(dto: RegistrationDto, locale: LocaleType, res: Response): Promise<{
        message: string;
    }>;
    logout(res: Response): {
        message: string;
    };
    refresh(req: Request, res: Response): Promise<{
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleCallback(locale: LocaleType, req: Request, res: Response): Promise<void>;
}
