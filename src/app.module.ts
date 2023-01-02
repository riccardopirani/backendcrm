import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { RouteInfo } from "@nestjs/common/interfaces";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UtenteModule } from "src/utente/utente.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AttivitacommessaController } from "./attivitacommessa/attivitacommessa.controller";
import { AttivitacommessaModule } from "./attivitacommessa/attivitacommessa.module";
import { AttivitamaterialeController } from "./attivitamateriale/attivitamateriale.controller";
import { AttivitaprevController } from "./attivitaprev/attivitaprev.controller";
import { AttivitaprevModule } from "./attivitaprev/attivitaprev.module";
import { ClienteController } from "./cliente/cliente.controller";
import { ClienteModule } from "./cliente/cliente.module";
import { CommessaController } from "./commessa/commessa.controller";
import { CommessaModule } from "./commessa/commessa.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import dbConfig from "./config/db.config";
import { jwtkey, expiresIn } from "./jwtkey/jwtkey.service";
import { MaterialeconsumoController } from "./materialeconsumo/materialeconsumo.controller";
import { MaterialeconsumoModule } from "./materialeconsumo/materialeconsumo.module";
import { MediaController } from "./media/media.controller";
import { MediaModule } from "./media/media.module";
import { FileModule } from "./microservices/file-microservice/file.module";
import { AuthMiddleware } from "./middleware/auth/auth.middleware";
import { PreventivoController } from "./preventivo/preventivo.controller";
import { PreventivoModule } from "./preventivo/preventivo.module";
import { ReportController } from "./report/report.controller";
import { SpesecommessaController } from "./spesecommessa/spesecommessa.controller";
import { SpesecommessaModule } from "./spesecommessa/spesecommessa.module";
import { SpesepreventivoController } from "./spesepreventivo/spesepreventivo.controller";
import { SpesepreventivoModule } from "./spesepreventivo/spesepreventivo.module";
import { AttivitamaterialeModule } from "./attivitamateriale/attivitamateriale.module";
import { ReportModule } from "./report/report.module";
import { UtenteController } from "./utente/utente.controller";
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return dbConfig(config.appConfig) as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
    PreventivoModule,
    SpesepreventivoModule,
    CommessaModule,
    MaterialeconsumoModule,
    SpesecommessaModule,
    AttivitacommessaModule,
    UtenteModule,
    ClienteModule,
    AttivitaprevModule,
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
    AttivitamaterialeModule,
    ReportModule,
    FileModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    this.addMiddleware(
      AuthMiddleware,
      consumer,
      [
        AttivitacommessaController,
        AttivitamaterialeController,
        AttivitaprevController,
        ClienteController,
        CommessaController,
        MaterialeconsumoController,
        MediaController,
        PreventivoController,
        ReportController,
        SpesecommessaController,
        SpesepreventivoController,
        UtenteController,
      ],
      [
        { path: "utente", method: RequestMethod.POST },
        { path: "utente/login", method: RequestMethod.POST },
        { path: "utente/:id", method: RequestMethod.GET },
        { path: "utente/:id", method: RequestMethod.PUT },
        { path: "cliente/:id", method: RequestMethod.DELETE },
      ]
    );
  }

  private addMiddleware(
    middleware: any,
    consumer: MiddlewareConsumer,
    controllerOrRouteInfo: any[],
    exclude?: RouteInfo[]
  ) {
    if (!exclude) {
      consumer.apply(middleware).forRoutes(...controllerOrRouteInfo);
    } else {
      consumer
        .apply(middleware)
        .exclude(...exclude)
        .forRoutes(...controllerOrRouteInfo);
    }
  }
}
