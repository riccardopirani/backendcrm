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
exports.UtenteModule = void 0;
const common_1 = require("@nestjs/common");
const utente_service_1 = require("./utente.service");
const utente_controller_1 = require("./utente.controller");
const utente_entity_1 = require("./entities/utente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
let UtenteModule = class UtenteModule {};
UtenteModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([utente_entity_1.Utente]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [utente_controller_1.UtenteController],
      providers: [utente_service_1.UtenteService],
      exports: [utente_service_1.UtenteService],
    }),
  ],
  UtenteModule
);
exports.UtenteModule = UtenteModule;
//# sourceMappingURL=utente.module.js.map
