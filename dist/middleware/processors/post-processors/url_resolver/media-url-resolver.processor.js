"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUrlResolverProcessor = void 0;
const microservice_client_1 = require("../../../../microservices/microservice-client");
const base_processor_1 = require("../../base.processor");
class MediaUrlResolverProcessor extends base_processor_1.BaseProcessor {
  constructor(configService) {
    super();
    this.configService = configService;
  }
  processEntity(entity) {
    if (entity && !entity["file_url"]) {
      entity["file_url"] = [
        this.configService.appConfig.fileEndpointBaseUrl,
        microservice_client_1.default.getDownloadUrlPart(entity["file_id"]),
      ].join("/");
    } else {
      entity["file_url"] = null;
    }
  }
}
exports.MediaUrlResolverProcessor = MediaUrlResolverProcessor;
//# sourceMappingURL=media-url-resolver.processor.js.map
