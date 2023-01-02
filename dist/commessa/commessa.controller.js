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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommessaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const export_to_csv_1 = require("export-to-csv");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const create_commessa_dto_1 = require("./dto/create-commessa.dto");
const commessa_service_1 = require("./commessa.service");
const update_commessa_dto_1 = require("./dto/update-commessa.dto");
const utente_service_1 = require("../utente/utente.service");
const utente_entity_1 = require("../utente/entities/utente.entity");
const commessa_entity_1 = require("./entities/commessa.entity");
const spesecommessa_service_1 = require("../spesecommessa/spesecommessa.service");
const attivitacommessa_service_1 = require("../attivitacommessa/attivitacommessa.service");
const moment = require("moment");
let CommessaController = class CommessaController {
  constructor(service, serviceutente, servicespese, serviceattivita) {
    this.service = service;
    this.serviceutente = serviceutente;
    this.servicespese = servicespese;
    this.serviceattivita = serviceattivita;
  }
  async create(dto) {
    return await this.service.createCommessa(dto);
  }
  async delete(nome) {
    return await this.service.findByRagioneSociale(nome);
  }
  async search(id) {
    var user = await this.serviceutente.findOne(+id.replace(":", ""));
    var ris;
    if (user.ruolo === utente_entity_1.UserRole.OPERATOR) {
      ris = await this.service.findbyState(
        commessa_entity_1.CommessaRole.IN_PROGRESS,
        user.id
      );
      return ris;
    } else {
      return await this.service.findAll();
    }
  }
  async findOne(id, request) {
    return await this.service.findOne(+id);
  }
  async updateoperatori(id, arrayvalue) {
    return await this.service.updateidoperatore(id, arrayvalue);
  }
  async update(id, updateCommessaDto) {
    return await this.service.updateCommessa(id, updateCommessaDto);
  }
  async report(id, start, end) {
    return await this.service.report(+id.replace(":", ""), start, end);
  }
  async reportjson(id, start, end) {
    return await this.service.loadfromcommessa(+id, start, end);
  }
  async reportjsonfull(id) {
    var datafull = [{ nome: "Nome", data: "Data", totale: "Totale" }];
    try {
      var dataattivita = await this.serviceattivita.loadfromcommessa(+id);
      var dataspesa = await this.servicespese.loadbycommessa(+id);
      for (var i = 0; i < dataattivita.length; i++) {
        try {
          var obejct = {
            nome: dataattivita[i].nome,
            data: moment(dataattivita[i].datacreazione).format(
              moment.localeData("it").longDateFormat("L")
            ),
            totale: `${dataattivita[i].ore} h`,
          };
          datafull.push(obejct);
        } catch (err) {
          console.log("Errore: " + err);
        }
      }
      for (var i = 0; i < dataspesa.length; i++) {
        try {
          var obejct2 = {
            nome: dataspesa[i].nome,
            data: moment(dataspesa[i].datacreazione).format(
              moment.localeData("it").longDateFormat("L")
            ),
            totale: `${dataspesa[i].costo} €`,
          };
          datafull.push(obejct2);
        } catch (err) {
          console.log("Errore: " + err);
        }
      }
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new export_to_csv_1.ExportToCsv(options);
      return csvExporter.generateCsv(JSON.stringify(datafull), true);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
      throw err;
    }
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commessa_dto_1.CreateCommessaDto]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "create",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/name"),
    __param(0, (0, common_1.Body)("nome")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "delete",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/search/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "search",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "findOne",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/update/operatori/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "updateoperatori",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      String,
      update_commessa_dto_1.UpdateCommessaDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "update",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/reportfull:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("start")),
    __param(2, (0, common_1.Body)("end")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "report",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/reportfull/data:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("start")),
    __param(2, (0, common_1.Body)("end")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "reportjson",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/report/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  CommessaController.prototype,
  "reportjsonfull",
  null
);
CommessaController = __decorate(
  [
    (0, swagger_1.ApiTags)("commessa"),
    (0, common_1.Controller)("commessa"),
    __metadata("design:paramtypes", [
      commessa_service_1.CommessaService,
      utente_service_1.UtenteService,
      spesecommessa_service_1.SpesecommessaService,
      attivitacommessa_service_1.AttivitacommessaService,
    ]),
  ],
  CommessaController
);
exports.CommessaController = CommessaController;
//# sourceMappingURL=commessa.controller.js.map
