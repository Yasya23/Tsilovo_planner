import { AuthDto, RegistrationDto } from './dto';
import { UserService } from '@/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly userService;
    constructor(configService: ConfigService, jwtService: JwtService, userService: UserService);
    login(loginDto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(registrationDto: RegistrationDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleLogin(userData: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private createTokenPair;
}
