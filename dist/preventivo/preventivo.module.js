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
exports.PreventivoModule = void 0;
const common_1 = require("@nestjs/common");
const preventivo_service_1 = require("./preventivo.service");
const preventivo_controller_1 = require("./preventivo.controller");
const preventivo_entity_1 = require("./entities/preventivo.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const utente_service_1 = require("../utente/utente.service");
const utente_entity_1 = require("../utente/entities/utente.entity");
const attivitaprev_entity_1 = require("../attivitaprev/entities/attivitaprev.entity");
const spesepreventivo_service_1 = require("../spesepreventivo/spesepreventivo.service");
const spesepreventivo_entity_1 = require("../spesepreventivo/entities/spesepreventivo.entity");
const attivitaprev_service_1 = require("../attivitaprev/attivitaprev.service");
let PreventivoModule = class PreventivoModule {};
PreventivoModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([preventivo_entity_1.Preventivo]),
        typeorm_1.TypeOrmModule.forFeature([utente_entity_1.Utente]),
        typeorm_1.TypeOrmModule.forFeature([
          attivitaprev_entity_1.Attivitaprev,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          spesepreventivo_entity_1.Spesepreventivo,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [preventivo_controller_1.PreventivoController],
      providers: [
        preventivo_service_1.PreventivoService,
        utente_service_1.UtenteService,
        attivitaprev_service_1.AttivitaprevService,
        spesepreventivo_service_1.SpesepreventivoService,
      ],
    }),
  ],
  PreventivoModule
);
exports.PreventivoModule = PreventivoModule;
//# sourceMappingURL=preventivo.module.js.map
