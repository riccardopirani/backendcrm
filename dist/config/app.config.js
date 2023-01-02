"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const appConfig = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  cors: process.env.CORS,
  baseURL: process.env.BASE_URL,
  fileServiceEndPointUrl: process.env.FILESERVICE_ENDPOINT_URL,
  fileEndpointBaseUrl: process.env.FILE_ENDPOINT_BASE_URL,
  db: {
    rootPsw: process.env.MYSQL_ROOT_PASSWORD,
    user: process.env.MYSQL_USER,
    psw: process.env.MYSQL_PASSWORD,
    databaseName: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
  },
  debug: process.env.DEBUG === "true",
  nearitDebug: process.env.NEARIT_DEBUG === "true",
  maxBodyLength: +process.env.MAX_BODY_LENGTH,
  maxRedirects: +process.env.MAX_REDIRECTS,
  encryption: {
    algorithm: process.env.ENCRYPTION_ALGORITHM,
    key: process.env.ENCRYPTION_KEY,
    enabled: true,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    maxAge: +process.env.JWT_MAX_AGE,
  },
  jwtRefresh: {
    secretKey: process.env.JWT_REFRESH_SECRET,
    maxAge: +process.env.JWT_REFRESH_MAX_AGE,
  },
  log: {
    maxDays: process.env.LOG_MAX_DAYS,
    maxSize: process.env.LOG_MAX_SIZE,
    fileName: process.env.LOG_FILENAME,
    level: process.env.LOG_LEVEL,
  },
  googleChat: {
    enabled: process.env.GOOGLE_CHAT_LOGGER_ENABLED === "true",
    url: process.env.GOOGLE_CHAT_WEBHOOK_URL,
  },
  swagger: {
    swaggerEnabled: process.env.SWAGGER_ENABLED === "true",
    swaggerPath: process.env.SWAGGER_URL_PATH,
    useStaticFile: process.env.SWAGGER_USE_STATIC_FILE === "true",
  },
};
exports.default = appConfig;
//# sourceMappingURL=app.config.js.map
