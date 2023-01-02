import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "../config/config.module";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { expiresIn, jwtkey } from "../jwtkey/jwtkey.service";
import { FileModule } from "../microservices/file-microservice/file.module";
import { MulterConfigService } from "../microservices/file-microservice/utils/multer-config.service";
import { Media } from "./entities/media.entity";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    ConfigModule,
    FileModule,
    MulterModule.registerAsync({
      imports: [ConfigModule, FileModule],
      useClass: MulterConfigService,
    }),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
