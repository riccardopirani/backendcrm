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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayService = void 0;
const common_1 = require("@nestjs/common");
const request = require("request");
let ApiGatewayService = class ApiGatewayService {
  request(method, url, req, res) {
    const requestOptions = {
      method,
      uri: url,
      qs: req.query,
    };
    const stream = request(requestOptions);
    req.pipe(stream);
    res.contentType("application/json");
    stream.pipe(res);
    return this.streamFinished(stream);
  }
  streamFinished(stream) {
    return new Promise((resolve, reject) => {
      stream.on("end", () => {
        resolve();
      });
      stream.on("error", () => {
        reject();
      });
    });
  }
};
ApiGatewayService = __decorate([(0, common_1.Injectable)()], ApiGatewayService);
exports.ApiGatewayService = ApiGatewayService;
//# sourceMappingURL=api-gateway.service.js.map
