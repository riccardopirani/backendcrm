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
exports.SpesepreventivoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const spesepreventivo_service_1 = require("./spesepreventivo.service");
const create_spesepreventivo_dto_1 = require("./dto/create-spesepreventivo.dto");
const preventivo_entity_1 = require("../preventivo/entities/preventivo.entity");
const update_spesepreventivo_dto_1 = require("./dto/update-spesepreventivo.dto");
let SpesepreventivoController = class SpesepreventivoController {
  constructor(spesepreventivoService) {
    this.spesepreventivoService = spesepreventivoService;
  }
  async create(createSpesepreventivoDto, request) {
    return await this.spesepreventivoService.create(createSpesepreventivoDto);
  }
  async findOne(preventivo, request) {
    return await this.spesepreventivoService.findOne(preventivo.id);
  }
  async delete(id, request) {
    return await this.spesepreventivoService.remove(+id);
  }
  async loadfrompreventivo(id, request) {
    return await this.spesepreventivoService.loadfrompreventivo(
      +id.replace(":", "")
    );
  }
  async total(id, request) {
    return await this.spesepreventivoService.totale(+id.replace(":", ""));
  }
  async update(id, dto, request) {
    return await this.spesepreventivoService.update(+id.replace(":", ""), dto);
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
      create_spesepreventivo_dto_1.CreateSpesepreventivoDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  SpesepreventivoController.prototype,
  "create",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [preventivo_entity_1.Preventivo, Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesepreventivoController.prototype,
  "findOne",
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
  SpesepreventivoController.prototype,
  "delete",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/preventivo/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  SpesepreventivoController.prototype,
  "loadfrompreventivo",
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
  SpesepreventivoController.prototype,
  "total",
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
      update_spesepreventivo_dto_1.UpdateSpesepreventivoDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  SpesepreventivoController.prototype,
  "update",
  null
);
SpesepreventivoController = __decorate(
  [
    (0, swagger_1.ApiTags)("spesepreventivo"),
    (0, common_1.Controller)("spesepreventivo"),
    __metadata("design:paramtypes", [
      spesepreventivo_service_1.SpesepreventivoService,
    ]),
  ],
  SpesepreventivoController
);
exports.SpesepreventivoController = SpesepreventivoController;
//# sourceMappingURL=spesepreventivo.controller.js.map
