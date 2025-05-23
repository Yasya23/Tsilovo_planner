"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWTDbConfig = void 0;
const getJWTDbConfig = async (configService) => {
    return {
        secret: configService.get('JWT_SECRET'),
    };
};
exports.getJWTDbConfig = getJWTDbConfig;
//# sourceMappingURL=jwt.config.js.map