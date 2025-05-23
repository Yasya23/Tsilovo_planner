import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare const getJWTDbConfig: (configService: ConfigService) => Promise<JwtModuleOptions>;
