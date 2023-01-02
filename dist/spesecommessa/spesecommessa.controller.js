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
exports.SpesecommessaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const spesecommessa_service_1 = require("./spesecommessa.service");
const create_spesecommessa_dto_1 = require("./dto/create-spesecommessa.dto");
const update_spesecommessa_dto_1 = require("./dto/update-spesecommessa.dto");
let SpesecommessaController = class SpesecommessaController {
  constructor(spesecommessaService) {
    this.spesecommessaService = spesecommessaService;
  }
  async create(createSpesecommessaDto, request) {
    return await this.spesecommessaService.create(createSpesecommessaDto);
  }
  async delete(id, request) {
    return await this.spesecommessaService.remove(+id.replace(":", ""));
  }
  async findAll(request) {
    return await this.spesecommessaService.findAll();
  }
  async total(id, request) {
    return await this.spesecommessaService.totale(+id.replace(":", ""));
  }
  async loadspese(id, request) {
    return await this.spesecommessaService.loadbycommessa(+id.replace(":", ""));
  }
  async update(id, updateClienteDto, request) {
    return await this.spesecommessaService.update(
      +id.replace(":", ""),
      updateClienteDto
    );
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_spesecommessa_dto_1.CreateSpesecommessaDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "create",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "delete",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "findAll",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/totcost/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "total",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/commessa/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "loadspese",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      String,
      update_spesecommessa_dto_1.UpdateSpesecommessaDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  SpesecommessaController.prototype,
  "update",
  null
);
SpesecommessaController = __decorate(
  [
    (0, swagger_1.ApiTags)("spesecommessa"),
    (0, common_1.Controller)("spesecommessa"),
    __metadata("design:paramtypes", [
      spesecommessa_service_1.SpesecommessaService,
    ]),
  ],
  SpesecommessaController
);
exports.SpesecommessaController = SpesecommessaController;
//# sourceMappingURL=spesecommessa.controller.js.map
