import { Module } from "@nestjs/common";
import { SpesepreventivoService } from "./spesepreventivo.service";
import { SpesepreventivoController } from "./spesepreventivo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Spesepreventivo } from "./entities/spesepreventivo.entity";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Spesepreventivo]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [SpesepreventivoController],
  providers: [SpesepreventivoService],
})
export class SpesepreventivoModule {}
