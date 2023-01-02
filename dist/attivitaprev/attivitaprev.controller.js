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
exports.AttivitaprevController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const attivitaprev_service_1 = require("./attivitaprev.service");
const create_attivitaprev_dto_1 = require("./dto/create-attivitaprev.dto");
const update_attivitaprev_dto_1 = require("./dto/update-attivitaprev.dto");
let AttivitaprevController = class AttivitaprevController {
  constructor(attivitaprevService) {
    this.attivitaprevService = attivitaprevService;
  }
  async create(createAttivitaprevDto, request) {
    return await this.attivitaprevService.create(createAttivitaprevDto);
  }
  async findAll(request) {
    return this.attivitaprevService.findAll();
  }
  async findOne(id, request) {
    return await this.attivitaprevService.findOne(+id.replace(":", ""));
  }
  async tothour(id, request) {
    return await this.attivitaprevService.totaleore(+id.replace(":", ""));
  }
  async update(id, updateAttivitaprevDto, request) {
    return this.attivitaprevService.update(+id, updateAttivitaprevDto);
  }
  async remove(id, request) {
    return this.attivitaprevService.remove(+id.replace(":", ""));
  }
  async reportcommessaore(id, request) {
    return await this.attivitaprevService.reportpreventivo(
      +id.replace(":", "")
    );
  }
  async updateattivita(id, nome, ore, request) {
    return await this.attivitaprevService.updateprev(
      +id.replace(":", ""),
      nome,
      ore
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
      create_attivitaprev_dto_1.CreateAttivitaprevDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitaprevController.prototype,
  "create",
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
  AttivitaprevController.prototype,
  "findAll",
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
  AttivitaprevController.prototype,
  "findOne",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/tothour/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  AttivitaprevController.prototype,
  "tothour",
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
      update_attivitaprev_dto_1.UpdateAttivitaprevDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitaprevController.prototype,
  "update",
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
  AttivitaprevController.prototype,
  "remove",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/report:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  AttivitaprevController.prototype,
  "reportcommessaore",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/update:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise),
  ],
  AttivitaprevController.prototype,
  "updateattivita",
  null
);
AttivitaprevController = __decorate(
  [
    (0, swagger_1.ApiTags)("attivitapreventivo"),
    (0, common_1.Controller)("attivitapreventivo"),
    __metadata("design:paramtypes", [
      attivitaprev_service_1.AttivitaprevService,
    ]),
  ],
  AttivitaprevController
);
exports.AttivitaprevController = AttivitaprevController;
//# sourceMappingURL=attivitaprev.controller.js.map
