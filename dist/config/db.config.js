"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(appConfig) {
  return {
    type: "mysql",
    host: appConfig.db.host,
    port: appConfig.db.port,
    username: appConfig.db.user,
    password: appConfig.db.psw,
    database: appConfig.db.databaseName,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: appConfig.debug,
    logging: appConfig.debug,
    timezone: "Z",
  };
}
exports.default = default_1;
//# sourceMappingURL=db.config.js.map
