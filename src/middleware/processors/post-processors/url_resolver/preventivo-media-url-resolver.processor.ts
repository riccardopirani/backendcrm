import { ConfigService } from "../../../../config/config.service";
import MicroServiceClient from "../../../../microservices/microservice-client";
import { Preventivo } from "../../../../preventivo/entities/preventivo.entity";
import { BaseProcessor } from "../../base.processor";

export class PreventivoMediaUrlResolverProcessor extends BaseProcessor {
  constructor(private configService: ConfigService) {
    super();
  }

  processEntity(entity: Preventivo) {
    if (entity && entity.gallery && entity.gallery.length > 0) {
      entity.gallery = entity.gallery.map((item) => {
        item["file_url"] = [
          this.configService.appConfig.fileEndpointBaseUrl,
          MicroServiceClient.getDownloadUrlPart(item["file_id"]),
        ].join("/");
        return item;
      });
    }
  }
}
