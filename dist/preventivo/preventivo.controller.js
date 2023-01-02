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
exports.PreventivoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const preventivo_service_1 = require("./preventivo.service");
const create_preventivo_dto_1 = require("./dto/create-preventivo.dto");
const update_preventivo_dto_1 = require("./dto/update-preventivo.dto");
const utente_service_1 = require("../utente/utente.service");
const utente_entity_1 = require("../utente/entities/utente.entity");
const attivitaprev_service_1 = require("../attivitaprev/attivitaprev.service");
const spesepreventivo_service_1 = require("../spesepreventivo/spesepreventivo.service");
let PreventivoController = class PreventivoController {
  constructor(service, utenteservice, attivitaservice, spesaservice) {
    this.service = service;
    this.utenteservice = utenteservice;
    this.attivitaservice = attivitaservice;
    this.spesaservice = spesaservice;
  }
  async create(createPreventivoDto) {
    return await this.service.createPreventivo(createPreventivoDto);
  }
  async update(id, updatePreventivoDto) {
    return await this.service.updatePreventivo(+id, updatePreventivoDto);
  }
  async confirm(id, dataaccettazione, idUtente) {
    if (!dataaccettazione || !id || !idUtente) {
      throw new common_1.NotAcceptableException();
    }
    var utente = await this.utenteservice.findOne(idUtente);
    var preventivo = await this.service.findOne(+id);
    if (!preventivo.prezzoscontato) {
      preventivo.prezzoscontato = preventivo.prezzototale;
    }
    if (
      utente.ruolo === utente_entity_1.UserRole.ADMIN ||
      utente.ruolo === utente_entity_1.UserRole.CONTROLLER ||
      utente.ruolo === utente_entity_1.UserRole.COMMERCIAL
    ) {
      if (
        (await this.attivitaservice.loadfrompreventivo(+id)).length > 0 ||
        (await this.spesaservice.loadfrompreventivo(+id)).length > 0
      ) {
        if (
          preventivo.dataconsegna != null &&
          preventivo.prezzototale != null
        ) {
          return await this.service.confirm(
            id,
            idUtente,
            dataaccettazione,
            preventivo.prezzoscontato
          );
        } else {
          throw new common_1.NotAcceptableException();
        }
      } else {
        throw new common_1.NotAcceptableException();
      }
    } else {
      throw new common_1.UnauthorizedException();
    }
  }
  async findAll() {
    return await this.service.findAll();
  }
  async findOne(id) {
    return await this.service.findOne(+id);
  }
  async delete(id) {
    return await this.service.deletePreventivo(+id);
  }
  async searchbyid(id) {
    var utente = await this.utenteservice.findOne(+id);
    return await this.service.searchbyid(utente.ruolo, +id);
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_preventivo_dto_1.CreatePreventivoDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
  "create",
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
      update_preventivo_dto_1.UpdatePreventivoDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
  "update",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Put)("confirm/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("dataaccettazione")),
    __param(2, (0, common_1.Body)("IdVenditore")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Date, Number]),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
  "confirm",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
  "findAll",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
  "findOne",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  PreventivoController.prototype,
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
  PreventivoController.prototype,
  "searchbyid",
  null
);
PreventivoController = __decorate(
  [
    (0, swagger_1.ApiTags)("preventivo"),
    (0, common_1.Controller)("preventivo"),
    __metadata("design:paramtypes", [
      preventivo_service_1.PreventivoService,
      utente_service_1.UtenteService,
      attivitaprev_service_1.AttivitaprevService,
      spesepreventivo_service_1.SpesepreventivoService,
    ]),
  ],
  PreventivoController
);
exports.PreventivoController = PreventivoController;
//# sourceMappingURL=preventivo.controller.js.map
