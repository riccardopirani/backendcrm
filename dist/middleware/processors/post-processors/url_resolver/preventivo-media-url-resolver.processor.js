"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreventivoMediaUrlResolverProcessor = void 0;
const microservice_client_1 = require("../../../../microservices/microservice-client");
const base_processor_1 = require("../../base.processor");
class PreventivoMediaUrlResolverProcessor extends base_processor_1.BaseProcessor {
  constructor(configService) {
    super();
    this.configService = configService;
  }
  processEntity(entity) {
    if (entity && entity.gallery && entity.gallery.length > 0) {
      entity.gallery = entity.gallery.map((item) => {
        item["file_url"] = [
          this.configService.appConfig.fileEndpointBaseUrl,
          microservice_client_1.default.getDownloadUrlPart(item["file_id"]),
        ].join("/");
        return item;
      });
    }
  }
}
exports.PreventivoMediaUrlResolverProcessor =
  PreventivoMediaUrlResolverProcessor;
//# sourceMappingURL=preventivo-media-url-resolver.processor.js.map
