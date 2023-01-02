"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const app_nestjs_config_1 = require("./config/app.nestjs.config");
const swagger_config_1 = require("./config/swagger.config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  const configService = app.get(config_service_1.ConfigService);
  (0, app_nestjs_config_1.default)(app, configService);
  (0, swagger_config_1.swaggerConfig)(app, configService);
  const port = configService.appConfig.port;
  const config = new swagger_1.DocumentBuilder()
    .setTitle("TendaTrack")
    .setDescription("Api of tendatrack")
    .setVersion("1.0")
    .addTag("tendatrack")
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup("api", app, document);
  await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
