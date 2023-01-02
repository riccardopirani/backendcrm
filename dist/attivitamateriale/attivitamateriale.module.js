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
exports.AttivitamaterialeModule = void 0;
const common_1 = require("@nestjs/common");
const attivitamateriale_service_1 = require("./attivitamateriale.service");
const attivitamateriale_controller_1 = require("./attivitamateriale.controller");
const attivitamateriale_entity_1 = require("./entities/attivitamateriale.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const materialeconsumo_entity_1 = require("../materialeconsumo/entities/materialeconsumo.entity");
const materialeconsumo_service_1 = require("../materialeconsumo/materialeconsumo.service");
const materialeconsumo_controller_1 = require("../materialeconsumo/materialeconsumo.controller");
let AttivitamaterialeModule = class AttivitamaterialeModule {};
AttivitamaterialeModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([
          attivitamateriale_entity_1.Attivitamateriale,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          materialeconsumo_entity_1.Materialeconsumo,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [
        attivitamateriale_controller_1.AttivitamaterialeController,
        materialeconsumo_controller_1.MaterialeconsumoController,
      ],
      providers: [
        attivitamateriale_service_1.AttivitamaterialeService,
        materialeconsumo_service_1.MaterialeconsumoService,
      ],
    }),
  ],
  AttivitamaterialeModule
);
exports.AttivitamaterialeModule = AttivitamaterialeModule;
//# sourceMappingURL=attivitamateriale.module.js.map
