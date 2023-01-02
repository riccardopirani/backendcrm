import { MulterModuleOptions } from "@nestjs/platform-express";
export declare class MulterConfigService {
  constructor();
  createMulterOptions(): Promise<MulterModuleOptions>;
}
