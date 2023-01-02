"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiresIn = exports.jwtkey = void 0;
const app_config_1 = require("../config/app.config");
exports.jwtkey = app_config_1.default.jwt.secretKey;
exports.expiresIn = app_config_1.default.jwt.maxAge;
//# sourceMappingURL=jwtkey.service.js.map
