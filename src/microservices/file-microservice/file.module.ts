import { Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { ApiGatewayService } from "../api-gateway/api-gateway.service";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";
import { MulterConfigService } from "./utils/multer-config.service";

@Module({
  imports: [ConfigModule],
  providers: [MulterConfigService, ApiGatewayService, FileService],
  controllers: [FileController],
  exports: [MulterConfigService, FileService],
})
export class FileModule {}
