"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservice_client_1 = require("../microservices/microservice-client");
const followRedirects = require("follow-redirects");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
exports.default = (app, configService) => {
  microservice_client_1.default.setup(
    configService.appConfig.fileServiceEndPointUrl
  );
  app.useGlobalPipes(new common_1.ValidationPipe());
  app.use(cookieParser());
  followRedirects.maxRedirects = configService.appConfig.maxRedirects;
  followRedirects.maxBodyLength =
    configService.appConfig.maxBodyLength * 1024 * 1024;
  const whiteList = configService.appConfig.cors.split(",");
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (whiteList.length === 1 && whiteList[0] === "*") {
        callback(null, true);
        return;
      }
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  });
};
//# sourceMappingURL=app.nestjs.config.js.map
