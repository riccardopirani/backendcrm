import { ConfigService } from "../../../../config/config.service";
import { Preventivo } from "../../../../preventivo/entities/preventivo.entity";
import { BaseProcessor } from "../../base.processor";
export declare class PreventivoMediaUrlResolverProcessor extends BaseProcessor {
  private configService;
  constructor(configService: ConfigService);
  processEntity(entity: Preventivo): void;
}
