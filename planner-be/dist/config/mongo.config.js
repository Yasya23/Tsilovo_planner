"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDbConfig = void 0;
const getMongoDbConfig = async (configService) => {
    return {
        uri: configService.get('MONGO_URI'),
    };
};
exports.getMongoDbConfig = getMongoDbConfig;
//# sourceMappingURL=mongo.config.js.map