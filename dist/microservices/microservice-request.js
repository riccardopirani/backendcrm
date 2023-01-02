"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTRequest = void 0;
const axios_1 = require("axios");
class MTRequest {
  static postWithFormData(url, formData) {
    return axios_1.default.post(url, formData, {
      headers: formData.getHeaders(),
    });
  }
  static delete(url) {
    return axios_1.default.delete(url);
  }
}
exports.MTRequest = MTRequest;
//# sourceMappingURL=microservice-request.js.map
