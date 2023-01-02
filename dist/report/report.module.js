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
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const report_controller_1 = require("./report.controller");
const preventivo_service_1 = require("../preventivo/preventivo.service");
const commessa_entity_1 = require("../commessa/entities/commessa.entity");
const commessa_service_1 = require("../commessa/commessa.service");
const attivitacommessa_entity_1 = require("../attivitacommessa/entities/attivitacommessa.entity");
const utente_entity_1 = require("../utente/entities/utente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const spesecommessa_entity_1 = require("../spesecommessa/entities/spesecommessa.entity");
const preventivo_entity_1 = require("../preventivo/entities/preventivo.entity");
const utente_service_1 = require("../utente/utente.service");
const attivitacommessa_service_1 = require("../attivitacommessa/attivitacommessa.service");
const spesecommessa_service_1 = require("../spesecommessa/spesecommessa.service");
const attivitaprev_service_1 = require("../attivitaprev/attivitaprev.service");
const attivitaprev_entity_1 = require("../attivitaprev/entities/attivitaprev.entity");
const spesepreventivo_service_1 = require("../spesepreventivo/spesepreventivo.service");
const spesepreventivo_entity_1 = require("../spesepreventivo/entities/spesepreventivo.entity");
let ReportModule = class ReportModule {};
ReportModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([commessa_entity_1.Commessa]),
        typeorm_1.TypeOrmModule.forFeature([utente_entity_1.Utente]),
        typeorm_1.TypeOrmModule.forFeature([
          attivitacommessa_entity_1.Attivitacommessa,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          attivitaprev_entity_1.Attivitaprev,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          spesecommessa_entity_1.Spesecommessa,
        ]),
        typeorm_1.TypeOrmModule.forFeature([
          spesepreventivo_entity_1.Spesepreventivo,
        ]),
        typeorm_1.TypeOrmModule.forFeature([preventivo_entity_1.Preventivo]),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      controllers: [report_controller_1.ReportController],
      providers: [
        report_service_1.ReportService,
        preventivo_service_1.PreventivoService,
        commessa_service_1.CommessaService,
        utente_service_1.UtenteService,
        spesecommessa_service_1.SpesecommessaService,
        spesepreventivo_service_1.SpesepreventivoService,
        attivitacommessa_service_1.AttivitacommessaService,
        spesecommessa_service_1.SpesecommessaService,
        attivitaprev_service_1.AttivitaprevService,
      ],
    }),
  ],
  ReportModule
);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map
