import { AuthDto, RegistrationDto } from 'src/typing/dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly userService;
    constructor(configService: ConfigService, jwtService: JwtService, userService: UserService);
    login(loginDto: AuthDto): Promise<{
        id: any;
        name: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }>;
    register(registrationDto: RegistrationDto): Promise<{
        id: any;
        name: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }>;
    getNewTokens(refreshToken: string): Promise<{
        id: any;
        name: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }>;
    googleLogin(userData: any): Promise<{
        id: any;
        name: string;
        email: string;
        image: string;
        accessToken: string;
        refreshToken: string;
    }>;
    private createTokenPair;
}
