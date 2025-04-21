"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../modules/auth/guard");
const guard_2 = require("../modules/auth/guard");
const Auth = (role = 'user') => {
    return (0, common_1.applyDecorators)(role === 'admin'
        ? (0, common_1.UseGuards)(guard_2.JwtAuthGuard, guard_1.AdminGuard)
        : (0, common_1.UseGuards)(guard_2.JwtAuthGuard));
};
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map