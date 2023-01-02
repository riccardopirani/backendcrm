import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "../config/config.service";
import { BaseService } from "../base-services/base.service";
import { FileService } from "../microservices/file-microservice/file.service";
import { MediaUrlResolverProcessor } from "../middleware/processors/post-processors/url_resolver/media-url-resolver.processor";
import { Media } from "./entities/media.entity";

@Injectable()
export class MediaService extends BaseService<Media> {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
    private configService: ConfigService,
    private fileService: FileService
  ) {
    super(mediaRepository, Media);
    this.addPostProcessor(new MediaUrlResolverProcessor(configService));
  }

  public async addMedia(data: any, req: any): Promise<Media> {
    let media: Media = new Media();
    media.preventivo_id = data.preventivo_id;
    return (await this.fileService.addFileToItem(
      this,
      media,
      "file_id",
      req
    )) as Media;
  }

  public async deleteMedia(mediaId: number): Promise<any> {
    return await this.fileService.deleteEntityAndFileByItemIdAndFileField(
      this,
      mediaId,
      "file_id"
    );
  }
}
