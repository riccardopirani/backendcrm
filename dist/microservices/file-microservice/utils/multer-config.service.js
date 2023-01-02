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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const multer_storage_engine_1 = require("./multer-storage-engine");
const microservice_client_1 = require("../../microservice-client");
let MulterConfigService = class MulterConfigService {
  constructor() {}
  async createMulterOptions() {
    return {
      storage: new multer_storage_engine_1.MulterStorageEngine(
        async (req, file, cb) => {
          if (!req.dynamicNames) {
            req.dynamicNames = [];
          }
          try {
            const res = await microservice_client_1.default.saveFile(file);
            req.dynamicNames.push(res);
            cb(null, res);
          } catch (e) {
            cb(e);
          }
        }
      ),
    };
  }
};
MulterConfigService = __decorate(
  [(0, common_1.Injectable)(), __metadata("design:paramtypes", [])],
  MulterConfigService
);
exports.MulterConfigService = MulterConfigService;
//# sourceMappingURL=multer-config.service.js.map
