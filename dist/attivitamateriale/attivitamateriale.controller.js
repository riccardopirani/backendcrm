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
exports.AttivitamaterialeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const attivitamateriale_service_1 = require("./attivitamateriale.service");
const create_attivitamateriale_dto_1 = require("./dto/create-attivitamateriale.dto");
const update_attivitamateriale_dto_1 = require("./dto/update-attivitamateriale.dto");
let AttivitamaterialeController = class AttivitamaterialeController {
  constructor(service) {
    this.service = service;
  }
  async create(createAttivitamaterialeDto) {
    return await this.service.create(createAttivitamaterialeDto);
  }
  async report(id) {
    return await this.service.report(+id.replace(":", ""));
  }
  async findAll() {
    return await this.service.findAll();
  }
  async findOne(id) {
    return this.service.findAll();
  }
  async idcommessa(id) {
    return this.service.findbyIdCommesa(+id);
  }
  async update(id, updateAttivitamaterialeDto) {
    return this.service.update(+id, updateAttivitamaterialeDto);
  }
  async remove(id) {
    return this.service.remove(+id);
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_attivitamateriale_dto_1.CreateAttivitamaterialeDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitamaterialeController.prototype,
  "create",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/report:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  AttivitamaterialeController.prototype,
  "report",
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
  AttivitamaterialeController.prototype,
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
  AttivitamaterialeController.prototype,
  "findOne",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/commessa/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  AttivitamaterialeController.prototype,
  "idcommessa",
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
      update_attivitamateriale_dto_1.UpdateAttivitamaterialeDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitamaterialeController.prototype,
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
  AttivitamaterialeController.prototype,
  "remove",
  null
);
AttivitamaterialeController = __decorate(
  [
    (0, swagger_1.ApiTags)("attivitamateriale"),
    (0, common_1.Controller)("attivitamateriale"),
    __metadata("design:paramtypes", [
      attivitamateriale_service_1.AttivitamaterialeService,
    ]),
  ],
  AttivitamaterialeController
);
exports.AttivitamaterialeController = AttivitamaterialeController;
//# sourceMappingURL=attivitamateriale.controller.js.map
