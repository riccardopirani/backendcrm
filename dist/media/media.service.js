"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_service_1 = require("../config/config.service");
const base_service_1 = require("../base-services/base.service");
const file_service_1 = require("../microservices/file-microservice/file.service");
const media_url_resolver_processor_1 = require("../middleware/processors/post-processors/url_resolver/media-url-resolver.processor");
const media_entity_1 = require("./entities/media.entity");
let MediaService = class MediaService extends base_service_1.BaseService {
  constructor(mediaRepository, configService, fileService) {
    super(mediaRepository, media_entity_1.Media);
    this.mediaRepository = mediaRepository;
    this.configService = configService;
    this.fileService = fileService;
    this.addPostProcessor(
      new media_url_resolver_processor_1.MediaUrlResolverProcessor(
        configService
      )
    );
  }
  async addMedia(data, req) {
    let media = new media_entity_1.Media();
    media.preventivo_id = data.preventivo_id;
    return await this.fileService.addFileToItem(this, media, "file_id", req);
  }
  async deleteMedia(mediaId) {
    return await this.fileService.deleteEntityAndFileByItemIdAndFileField(
      this,
      mediaId,
      "file_id"
    );
  }
};
MediaService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [
      typeorm_2.Repository,
      config_service_1.ConfigService,
      file_service_1.FileService,
    ]),
  ],
  MediaService
);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map
