import { Commessa } from "../../../../commessa/entities/commessa.entity";
import { ConfigService } from "../../../../config/config.service";
import { BaseProcessor } from "../../base.processor";
export declare class CommessaMediaUrlResolverProcessor extends BaseProcessor {
  private configService;
  constructor(configService: ConfigService);
  processEntity(entity: Commessa): void;
}
