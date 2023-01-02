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
exports.MaterialeconsumoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const materialeconsumo_service_1 = require("./materialeconsumo.service");
const create_materialeconsumo_dto_1 = require("./dto/create-materialeconsumo.dto");
const update_materialeconsumo_dto_1 = require("./dto/update-materialeconsumo.dto");
let MaterialeconsumoController = class MaterialeconsumoController {
  constructor(materialeconsumoService) {
    this.materialeconsumoService = materialeconsumoService;
  }
  async create(createMaterialeconsumoDto) {
    return this.materialeconsumoService.create(createMaterialeconsumoDto);
  }
  async findAll() {
    return this.materialeconsumoService.findAll();
  }
  async findOne(id) {
    return this.materialeconsumoService.findOne(+id);
  }
  async update(id, updateMaterialeconsumoDto) {
    return this.materialeconsumoService.update(+id, updateMaterialeconsumoDto);
  }
  async remove(id) {
    return this.materialeconsumoService.remove(+id);
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_materialeconsumo_dto_1.CreateMaterialeconsumoDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  MaterialeconsumoController.prototype,
  "create",
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
  MaterialeconsumoController.prototype,
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
  MaterialeconsumoController.prototype,
  "findOne",
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
      update_materialeconsumo_dto_1.UpdateMaterialeconsumoDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  MaterialeconsumoController.prototype,
  "update",
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
  MaterialeconsumoController.prototype,
  "remove",
  null
);
MaterialeconsumoController = __decorate(
  [
    (0, swagger_1.ApiTags)("materialeconsumo"),
    (0, common_1.Controller)("materialeconsumo"),
    __metadata("design:paramtypes", [
      materialeconsumo_service_1.MaterialeconsumoService,
    ]),
  ],
  MaterialeconsumoController
);
exports.MaterialeconsumoController = MaterialeconsumoController;
//# sourceMappingURL=materialeconsumo.controller.js.map
