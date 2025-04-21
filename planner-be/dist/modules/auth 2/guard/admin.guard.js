"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user.isAdmin)
            throw new common_1.ForbiddenException("You don't have rights");
        return user.isAdmin;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map