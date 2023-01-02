"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const utente_module_1 = require("./utente/utente.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const attivitacommessa_controller_1 = require("./attivitacommessa/attivitacommessa.controller");
const attivitacommessa_module_1 = require("./attivitacommessa/attivitacommessa.module");
const attivitamateriale_controller_1 = require("./attivitamateriale/attivitamateriale.controller");
const attivitaprev_controller_1 = require("./attivitaprev/attivitaprev.controller");
const attivitaprev_module_1 = require("./attivitaprev/attivitaprev.module");
const cliente_controller_1 = require("./cliente/cliente.controller");
const cliente_module_1 = require("./cliente/cliente.module");
const commessa_controller_1 = require("./commessa/commessa.controller");
const commessa_module_1 = require("./commessa/commessa.module");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const db_config_1 = require("./config/db.config");
const jwtkey_service_1 = require("./jwtkey/jwtkey.service");
const materialeconsumo_controller_1 = require("./materialeconsumo/materialeconsumo.controller");
const materialeconsumo_module_1 = require("./materialeconsumo/materialeconsumo.module");
const media_controller_1 = require("./media/media.controller");
const media_module_1 = require("./media/media.module");
const file_module_1 = require("./microservices/file-microservice/file.module");
const auth_middleware_1 = require("./middleware/auth/auth.middleware");
const preventivo_controller_1 = require("./preventivo/preventivo.controller");
const preventivo_module_1 = require("./preventivo/preventivo.module");
const report_controller_1 = require("./report/report.controller");
const spesecommessa_controller_1 = require("./spesecommessa/spesecommessa.controller");
const spesecommessa_module_1 = require("./spesecommessa/spesecommessa.module");
const spesepreventivo_controller_1 = require("./spesepreventivo/spesepreventivo.controller");
const spesepreventivo_module_1 = require("./spesepreventivo/spesepreventivo.module");
const attivitamateriale_module_1 = require("./attivitamateriale/attivitamateriale.module");
const report_module_1 = require("./report/report.module");
const utente_controller_1 = require("./utente/utente.controller");
let AppModule = class AppModule {
  configure(consumer) {
    this.addMiddleware(
      auth_middleware_1.AuthMiddleware,
      consumer,
      [
        attivitacommessa_controller_1.AttivitacommessaController,
        attivitamateriale_controller_1.AttivitamaterialeController,
        attivitaprev_controller_1.AttivitaprevController,
        cliente_controller_1.ClienteController,
        commessa_controller_1.CommessaController,
        materialeconsumo_controller_1.MaterialeconsumoController,
        media_controller_1.MediaController,
        preventivo_controller_1.PreventivoController,
        report_controller_1.ReportController,
        spesecommessa_controller_1.SpesecommessaController,
        spesepreventivo_controller_1.SpesepreventivoController,
        utente_controller_1.UtenteController,
      ],
      [
        { path: "utente", method: common_1.RequestMethod.POST },
        { path: "utente/login", method: common_1.RequestMethod.POST },
        { path: "utente/:id", method: common_1.RequestMethod.GET },
        { path: "utente/:id", method: common_1.RequestMethod.PUT },
        { path: "cliente/:id", method: common_1.RequestMethod.DELETE },
      ]
    );
  }
  addMiddleware(middleware, consumer, controllerOrRouteInfo, exclude) {
    if (!exclude) {
      consumer.apply(middleware).forRoutes(...controllerOrRouteInfo);
    } else {
      consumer
        .apply(middleware)
        .exclude(...exclude)
        .forRoutes(...controllerOrRouteInfo);
    }
  }
};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forRootAsync({
          imports: [config_module_1.ConfigModule],
          useFactory: (config) => {
            return (0, db_config_1.default)(config.appConfig);
          },
          inject: [config_service_1.ConfigService],
        }),
        preventivo_module_1.PreventivoModule,
        spesepreventivo_module_1.SpesepreventivoModule,
        commessa_module_1.CommessaModule,
        materialeconsumo_module_1.MaterialeconsumoModule,
        spesecommessa_module_1.SpesecommessaModule,
        attivitacommessa_module_1.AttivitacommessaModule,
        utente_module_1.UtenteModule,
        cliente_module_1.ClienteModule,
        attivitaprev_module_1.AttivitaprevModule,
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
        attivitamateriale_module_1.AttivitamaterialeModule,
        report_module_1.ReportModule,
        file_module_1.FileModule,
        media_module_1.MediaModule,
      ],
      controllers: [app_controller_1.AppController],
      providers: [app_service_1.AppService],
    }),
  ],
  AppModule
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
