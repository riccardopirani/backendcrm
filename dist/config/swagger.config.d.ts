import { INestApplication } from "@nestjs/common";
import { ConfigService } from "./config.service";
export declare const AUTH_BEARER_TAG = "Authorization";
export declare function swaggerConfig(
  app: INestApplication,
  configService: ConfigService
): void;
