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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorator_1 = require("../utils/swagger/swagger.decorator");
const common_decorator_1 = require("../utils/validators/decorators/common.decorator");
const create_media_dto_1 = require("./dto/create-media.dto");
const media_service_1 = require("./media.service");
let MediaController = class MediaController {
  constructor(service, jwtservice) {
    this.service = service;
    this.jwtservice = jwtservice;
  }
  async create(body, request) {
    let data = JSON.parse(body.data);
    return await this.service.addMedia(data, request);
  }
  async delete(id) {
    await this.service.deleteMedia(id);
  }
};
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, swagger_decorator_1.ApiFormDataRequestWithFiles)(
      create_media_dto_1.CreateMediaDto
    ),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(
      (0, platform_express_1.FilesInterceptor)("files")
    ),
    __param(0, (0, common_decorator_1.BodyValidated)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
      create_media_dto_1.CreateMediaDto,
      Object,
    ]),
    __metadata("design:returntype", Promise),
  ],
  MediaController.prototype,
  "create",
  null
);
__decorate(
  [
    (0, swagger_decorator_1.ApiBearerAuthWithTag)(),
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  MediaController.prototype,
  "delete",
  null
);
MediaController = __decorate(
  [
    (0, swagger_1.ApiTags)("media"),
    (0, common_1.Controller)("media"),
    __metadata("design:paramtypes", [
      media_service_1.MediaService,
      jwt_1.JwtService,
    ]),
  ],
  MediaController
);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map
