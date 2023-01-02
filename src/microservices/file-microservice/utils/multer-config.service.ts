import { Injectable } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { ConfigService } from "../../../config/config.service";
import { MulterStorageEngine } from "./multer-storage-engine";
import MicroserviceClient from "../../microservice-client";

@Injectable()
export class MulterConfigService {
  constructor() {}

  async createMulterOptions(): Promise<MulterModuleOptions> {
    return {
      storage: new MulterStorageEngine(async (req, file, cb) => {
        if (!req.dynamicNames) {
          req.dynamicNames = [];
        }

        try {
          const res = await MicroserviceClient.saveFile(file);
          req.dynamicNames.push(res);
          cb(null, res);
        } catch (e) {
          cb(e);
        }
      }),
    };
  }
}
