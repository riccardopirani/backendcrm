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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../../config/config.service");
const api_gateway_base_controller_1 = require("../api-gateway/api-gateway-base.controller");
const api_gateway_service_1 = require("../api-gateway/api-gateway.service");
let FileController = class FileController extends api_gateway_base_controller_1.ApiGatewayBaseController {
  constructor(configService, apiGatewayService) {
    super(apiGatewayService);
    this.configService = configService;
    this.prefix = "/file";
    this.endPointUrl = this.configService.appConfig.fileServiceEndPointUrl;
  }
  async get(req, res) {
    await this.request(this.prefix, this.endPointUrl, req, res);
  }
};
__decorate(
  [
    (0, common_1.Get)("download/?*"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  FileController.prototype,
  "get",
  null
);
FileController = __decorate(
  [
    (0, swagger_1.ApiTags)("file"),
    (0, common_1.Controller)("file"),
    __metadata("design:paramtypes", [
      config_service_1.ConfigService,
      api_gateway_service_1.ApiGatewayService,
    ]),
  ],
  FileController
);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map
