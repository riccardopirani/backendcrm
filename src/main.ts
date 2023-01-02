import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";
import nestjsConfig from "./config/app.nestjs.config";
import { swaggerConfig } from "./config/swagger.config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  nestjsConfig(app, configService);
  swaggerConfig(app, configService);
  const port = configService.appConfig.port;
  const config = new DocumentBuilder()
    .setTitle("TendaTrack")
    .setDescription("Api of tendatrack")
    .setVersion("1.0")
    .addTag("tendatrack")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
}

bootstrap();
