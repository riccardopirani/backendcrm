"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = exports.AUTH_BEARER_TAG = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.AUTH_BEARER_TAG = "Authorization";
function swaggerConfig(app, configService) {
  let swaggerDocument;
  if (!!configService.appConfig.swagger.swaggerEnabled) {
    if (!configService.appConfig.swagger.useStaticFile) {
      const options = new swagger_1.DocumentBuilder()
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
          exports.AUTH_BEARER_TAG
        )
        .build();
      swaggerDocument = swagger_1.SwaggerModule.createDocument(app, options);
    } else {
      swaggerDocument = require("../components/swagger/swagger.json");
    }
    swagger_1.SwaggerModule.setup(
      configService.appConfig.swagger.swaggerPath,
      app,
      swaggerDocument
    );
  }
}
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swagger.config.js.map
