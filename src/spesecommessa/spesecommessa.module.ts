import { Module } from "@nestjs/common";
import { SpesecommessaService } from "./spesecommessa.service";
import { SpesecommessaController } from "./spesecommessa.controller";
import { Spesecommessa } from "./entities/spesecommessa.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Spesecommessa]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [SpesecommessaController],
  providers: [SpesecommessaService],
})
export class SpesecommessaModule {}
