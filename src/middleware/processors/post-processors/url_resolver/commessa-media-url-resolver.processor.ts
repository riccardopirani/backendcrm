import { Commessa } from "../../../../commessa/entities/commessa.entity";
import { ConfigService } from "../../../../config/config.service";
import MicroServiceClient from "../../../../microservices/microservice-client";
import { BaseProcessor } from "../../base.processor";

export class CommessaMediaUrlResolverProcessor extends BaseProcessor {
  constructor(private configService: ConfigService) {
    super();
  }

  processEntity(entity: Commessa) {
    if (
      entity &&
      entity.preventivo &&
      entity.preventivo.gallery &&
      entity.preventivo.gallery.length > 0
    ) {
      entity.preventivo.gallery = entity.preventivo.gallery.map((item) => {
        item["file_url"] = [
          this.configService.appConfig.fileEndpointBaseUrl,
          MicroServiceClient.getDownloadUrlPart(item["file_id"]),
        ].join("/");
        return item;
      });
    }
  }
}
