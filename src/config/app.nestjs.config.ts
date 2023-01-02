import MicroserviceClient from "../microservices/microservice-client";
import { ConfigService } from "./config.service";
import followRedirects = require("follow-redirects");
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

export default (app, configService: ConfigService) => {
  MicroserviceClient.setup(configService.appConfig.fileServiceEndPointUrl);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  followRedirects.maxRedirects = configService.appConfig.maxRedirects; // default 21
  followRedirects.maxBodyLength =
    configService.appConfig.maxBodyLength * 1024 * 1024; // default 10Mb - 50Mb for configService.appConfig.maxBodyLength === 50
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
