"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const auth_guard_1 = require("../guard/auth.guard");
const common_1 = require("@nestjs/common");
const Auth = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard));
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map