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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_module_1 = require("../config/config.module");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const jwtkey_service_1 = require("../jwtkey/jwtkey.service");
const file_module_1 = require("../microservices/file-microservice/file.module");
const multer_config_service_1 = require("../microservices/file-microservice/utils/multer-config.service");
const media_entity_1 = require("./entities/media.entity");
const media_controller_1 = require("./media.controller");
const media_service_1 = require("./media.service");
let MediaModule = class MediaModule {};
MediaModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forFeature([media_entity_1.Media]),
        config_module_1.ConfigModule,
        file_module_1.FileModule,
        platform_express_1.MulterModule.registerAsync({
          imports: [config_module_1.ConfigModule, file_module_1.FileModule],
          useClass: multer_config_service_1.MulterConfigService,
        }),
        jwt_1.JwtModule.register({
          secret: jwtkey_service_1.jwtkey,
          signOptions: { expiresIn: jwtkey_service_1.expiresIn },
        }),
      ],
      providers: [media_service_1.MediaService],
      controllers: [media_controller_1.MediaController],
      exports: [media_service_1.MediaService],
    }),
  ],
  MediaModule
);
exports.MediaModule = MediaModule;
//# sourceMappingURL=media.module.js.map
