"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locale = void 0;
const common_1 = require("@nestjs/common");
exports.Locale = (0, common_1.createParamDecorator)((defaultLocale = 'en', ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies?.NEXT_LOCALE ?? defaultLocale;
});
//# sourceMappingURL=locale.decorator.js.map