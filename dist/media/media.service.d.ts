import { Repository } from "typeorm";
import { ConfigService } from "../config/config.service";
import { BaseService } from "../base-services/base.service";
import { FileService } from "../microservices/file-microservice/file.service";
import { Media } from "./entities/media.entity";
export declare class MediaService extends BaseService<Media> {
  private mediaRepository;
  private configService;
  private fileService;
  constructor(
    mediaRepository: Repository<Media>,
    configService: ConfigService,
    fileService: FileService
  );
  addMedia(data: any, req: any): Promise<Media>;
  deleteMedia(mediaId: number): Promise<any>;
}
