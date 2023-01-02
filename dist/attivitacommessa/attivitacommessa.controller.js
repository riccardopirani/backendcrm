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
exports.AttivitacommessaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const attivitacommessa_service_1 = require("./attivitacommessa.service");
const create_attivitacommessa_dto_1 = require("./dto/create-attivitacommessa.dto");
const update_attivitacommessa_dto_1 = require("./dto/update-attivitacommessa.dto");
let AttivitacommessaController = class AttivitacommessaController {
  constructor(attivitacommessaService) {
    this.attivitacommessaService = attivitacommessaService;
  }
  async create(createAttivitacommessaDto) {
    return await this.attivitacommessaService.create(createAttivitacommessaDto);
  }
  async loadfromcommessa(id) {
    return await this.attivitacommessaService.loadfromcommessa(
      +id.replace(":", "")
    );
  }
  async delete(id) {
    return await this.attivitacommessaService.remove(+id.replace(":", ""));
  }
  async tothour(id) {
    return await this.attivitacommessaService.totaleore(+id.replace(":", ""));
  }
  async reportcommessaore(id) {
    return await this.attivitacommessaService.reportcommessaore(
      +id.replace(":", "")
    );
  }
  async update(id, updateAttivitacommessaDto) {
    return await this.attivitacommessaService.update(
      +id,
      updateAttivitacommessaDto
    );
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_attivitacommessa_dto_1.CreateAttivitacommessaDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitacommessaController.prototype,
  "create",
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
  AttivitacommessaController.prototype,
  "loadfromcommessa",
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
  AttivitacommessaController.prototype,
  "delete",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Get)("/tothour/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  AttivitacommessaController.prototype,
  "tothour",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/report:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise),
  ],
  AttivitacommessaController.prototype,
  "reportcommessaore",
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
      Number,
      update_attivitacommessa_dto_1.UpdateAttivitacommessaDto,
    ]),
    __metadata("design:returntype", Promise),
  ],
  AttivitacommessaController.prototype,
  "update",
  null
);
AttivitacommessaController = __decorate(
  [
    (0, swagger_1.ApiTags)("attivitacommessa"),
    (0, common_1.Controller)("attivitacommessa"),
    __metadata("design:paramtypes", [
      attivitacommessa_service_1.AttivitacommessaService,
    ]),
  ],
  AttivitacommessaController
);
exports.AttivitacommessaController = AttivitacommessaController;
//# sourceMappingURL=attivitacommessa.controller.js.map
