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
exports.CommessaModule = void 0;
const common_1 = require("@nestjs/common");
const commessa_service_1 = require("./commessa.service");
const commessa_controller_1 = require("./commessa.controller");
const typeorm_1 = require("@nestjs/typeorm");
const commessa_entity_1 = require("./entities/commessa.entity");
const utente_service_1 = require("../utente/utente.service");
const utente_entity_1 = require("../utente/entities/utente.entity");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const jwt_1 = require("@nestjs/jwt");
const attivitacommessa_entity_1 = require("../attivitacommessa/entities/attivitacommessa.entity");
const spesecommessa_entity_1 = require("../spesecommessa/entities/spesecommessa.entity");
const attivitacommessa_service_1 = require("../attivitacommessa/attivitacommessa.service");
const spesecommessa_service_1 = require("../spesecommessa/spesecommessa.service");
let CommessaModule = class CommessaModule {};
CommessaModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([commessa_entity_1.Commessa]),
        typeorm_1.TypeOrmModule.forFeature([utente_entity_1.Utente]),
        typeorm_1.TypeOrmModule.forFeature([
          attivitacommessa_entity_1.Attivitacommessa,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          spesecommessa_entity_1.Spesecommessa,
        ]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [commessa_controller_1.CommessaController],
      providers: [
        commessa_service_1.CommessaService,
        utente_service_1.UtenteService,
        attivitacommessa_service_1.AttivitacommessaService,
        spesecommessa_service_1.SpesecommessaService,
      ],
    }),
  ],
  CommessaModule
);
exports.CommessaModule = CommessaModule;
//# sourceMappingURL=commessa.module.js.map
