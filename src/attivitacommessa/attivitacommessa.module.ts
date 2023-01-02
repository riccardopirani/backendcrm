import { Module } from "@nestjs/common";
import { AttivitacommessaService } from "./attivitacommessa.service";
import { AttivitacommessaController } from "./attivitacommessa.controller";
import { Attivitacommessa } from "./entities/attivitacommessa.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attivitacommessa]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [AttivitacommessaController],
  providers: [AttivitacommessaService],
})
export class AttivitacommessaModule {}
