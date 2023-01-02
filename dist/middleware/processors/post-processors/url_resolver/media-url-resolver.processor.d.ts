import { ConfigService } from "../../../../config/config.service";
import { Media } from "../../../../media/entities/media.entity";
import { BaseProcessor } from "../../base.processor";
export declare class MediaUrlResolverProcessor extends BaseProcessor {
  private configService;
  constructor(configService: ConfigService);
  processEntity(entity: Media): void;
}
