import { Module } from "@nestjs/common";
import { PreventivoService } from "./preventivo.service";
import { PreventivoController } from "./preventivo.controller";
import { Preventivo } from "./entities/preventivo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { UtenteService } from "src/utente/utente.service";
import { Utente } from "src/utente/entities/utente.entity";
import { Attivitaprev } from "src/attivitaprev/entities/attivitaprev.entity";
import { SpesepreventivoService } from "src/spesepreventivo/spesepreventivo.service";
import { Spesepreventivo } from "src/spesepreventivo/entities/spesepreventivo.entity";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Preventivo]),
    TypeOrmModule.forFeature([Utente]),
    TypeOrmModule.forFeature([Attivitaprev]),
    TypeOrmModule.forFeature([Spesepreventivo]),

    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [PreventivoController],
  providers: [
    PreventivoService,
    UtenteService,
    AttivitaprevService,
    SpesepreventivoService,
  ],
})
export class PreventivoModule {}
