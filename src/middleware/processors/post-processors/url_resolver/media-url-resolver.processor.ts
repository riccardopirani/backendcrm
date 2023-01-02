import { ConfigService } from "../../../../config/config.service";
import { Media } from "../../../../media/entities/media.entity";
import MicroServiceClient from "../../../../microservices/microservice-client";
import { BaseProcessor } from "../../base.processor";

export class MediaUrlResolverProcessor extends BaseProcessor {
  constructor(private configService: ConfigService) {
    super();
  }

  processEntity(entity: Media) {
    if (entity && !entity["file_url"]) {
      entity["file_url"] = [
        this.configService.appConfig.fileEndpointBaseUrl,
        MicroServiceClient.getDownloadUrlPart(entity["file_id"]),
      ].join("/");
    } else {
      entity["file_url"] = null;
    }
  }
}
