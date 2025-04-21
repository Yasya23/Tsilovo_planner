import { Response } from 'express';
export declare function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void;
export declare function clearAuthCookies(res: Response): void;
