"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayBaseController = void 0;
class ApiGatewayBaseController {
  constructor(apiGatewayService) {
    this.apiGatewayService = apiGatewayService;
  }
  request(prefix, baseUrl, req, res) {
    const path =
      req.path.indexOf(prefix) === 0 ? req.path.slice(prefix.length) : req.path;
    return this.apiGatewayService.request(req.method, baseUrl + path, req, res);
  }
}
exports.ApiGatewayBaseController = ApiGatewayBaseController;
//# sourceMappingURL=api-gateway-base.controller.js.map
