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
exports.UtenteController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const utente_service_1 = require("./utente.service");
const update_utente_dto_1 = require("./dto/update-utente.dto");
const utente_entity_1 = require("./entities/utente.entity");
let UtenteController = class UtenteController {
  constructor(utenteService, jwtservice) {
    this.utenteService = utenteService;
    this.jwtservice = jwtservice;
  }
  async create(dto) {
    return await this.utenteService.create(dto);
  }
  async findAll(request) {
    return await this.utenteService.findAll();
  }
  async login(dto, response) {
    const user = await this.utenteService.Login(dto);
    const jwt = await this.jwtservice.signAsync({ id: user.id });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send({
      id: user.id,
      token: jwt,
    });
  }
  async findOne(id, response) {
    const user = await this.utenteService.findOne(+id);
    if (!user) {
      throw new common_1.UnauthorizedException();
    }
    const jwt = await this.jwtservice.signAsync({ id: user.id });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send(user);
  }
  async update(id, updateUtenteDto, response) {
    const user = await this.utenteService.update(+id, updateUtenteDto);
    if (!user) {
      throw new common_1.UnauthorizedException();
    }
    const jwt = await this.jwtservice.signAsync({ id: id });
    response.cookie("jwt", jwt, { httpOnly: true });
    response.send(user);
  }
  async updatepassword(id, password, request) {
    return await this.utenteService.updapassword(id, password);
  }
  async remove(id, request) {
    return this.utenteService.remove(+id);
  }
  async updatestate(id, enable, request) {
    return await this.utenteService.updatestate(id, enable);
  }
};
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [utente_entity_1.Utente]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
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
  UtenteController.prototype,
  "findAll",
  null
);
__decorate(
  [
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [utente_entity_1.UtenteLogin, Object]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
  "login",
  null
);
__decorate(
  [
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
  "findOne",
  null
);
__decorate(
  [
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      String,
      update_utente_dto_1.UpdateUtenteDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
  "update",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/changepassword"),
    __param(0, (0, common_1.Body)("id")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
  "updatepassword",
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
  UtenteController.prototype,
  "remove",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Post)("/updatestate"),
    __param(0, (0, common_1.Body)("id")),
    __param(1, (0, common_1.Body)("enable")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise),
  ],
  UtenteController.prototype,
  "updatestate",
  null
);
UtenteController = __decorate(
  [
    (0, swagger_1.ApiTags)("utente"),
    (0, common_1.Controller)("utente"),
    __metadata("design:paramtypes", [
      utente_service_1.UtenteService,
      jwt_1.JwtService,
    ]),
  ],
  UtenteController
);
exports.UtenteController = UtenteController;
//# sourceMappingURL=utente.controller.js.map
