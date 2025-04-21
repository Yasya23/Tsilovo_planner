"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = setAuthCookies;
exports.clearAuthCookies = clearAuthCookies;
const isProduction = process.env.NODE_ENV === 'production';
function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 10 * 60 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 21 * 24 * 60 * 60 * 1000,
    });
}
function clearAuthCookies(res) {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
    });
}
//# sourceMappingURL=auth.js.map