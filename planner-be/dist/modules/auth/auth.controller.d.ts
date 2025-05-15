import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto } from 'src/typing/dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(dto: AuthDto, res: Response): Promise<{
        message: string;
    }>;
    register(dto: RegistrationDto, res: Response): Promise<{
        message: string;
    }>;
    logout(res: Response): {
        message: string;
    };
    refresh(req: Request, res: Response): Promise<{
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleCallback(req: Request, res: Response): Promise<void>;
}
