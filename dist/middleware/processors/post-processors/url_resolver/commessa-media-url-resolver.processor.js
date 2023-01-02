"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommessaMediaUrlResolverProcessor = void 0;
const microservice_client_1 = require("../../../../microservices/microservice-client");
const base_processor_1 = require("../../base.processor");
class CommessaMediaUrlResolverProcessor extends base_processor_1.BaseProcessor {
  constructor(configService) {
    super();
    this.configService = configService;
  }
  processEntity(entity) {
    if (
      entity &&
      entity.preventivo &&
      entity.preventivo.gallery &&
      entity.preventivo.gallery.length > 0
    ) {
      entity.preventivo.gallery = entity.preventivo.gallery.map((item) => {
        item["file_url"] = [
          this.configService.appConfig.fileEndpointBaseUrl,
          microservice_client_1.default.getDownloadUrlPart(item["file_id"]),
        ].join("/");
        return item;
      });
    }
  }
}
exports.CommessaMediaUrlResolverProcessor = CommessaMediaUrlResolverProcessor;
//# sourceMappingURL=commessa-media-url-resolver.processor.js.map
