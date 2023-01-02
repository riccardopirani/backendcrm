import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "./config.service";

export const AUTH_BEARER_TAG = "Authorization";

export function swaggerConfig(
  app: INestApplication,
  configService: ConfigService
) {
  let swaggerDocument: OpenAPIObject;
  if (!!configService.appConfig.swagger.swaggerEnabled) {
    if (!configService.appConfig.swagger.useStaticFile) {
      const options = new DocumentBuilder()
        .setTitle(configService.appConfig.appName)
        .setDescription(configService.appConfig.appName + "API")
        .setVersion("1.0")
        .addServer("/")
        .addBearerAuth(
          {
            in: "header",
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "Authorization",
          },
          AUTH_BEARER_TAG
        )
        .build();
      swaggerDocument = SwaggerModule.createDocument(app, options);
    } else {
      swaggerDocument = require("../components/swagger/swagger.json");
    }
    SwaggerModule.setup(
      configService.appConfig.swagger.swaggerPath,
      app,
      swaggerDocument
    );
  }
}
