import { Module } from "@nestjs/common";
import { CommessaService } from "./commessa.service";
import { CommessaController } from "./commessa.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Commessa } from "./entities/commessa.entity";
import { UtenteService } from "src/utente/utente.service";
import { Utente } from "src/utente/entities/utente.entity";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";
import { Attivitacommessa } from "src/attivitacommessa/entities/attivitacommessa.entity";
import { Spesecommessa } from "src/spesecommessa/entities/spesecommessa.entity";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
import { SpesecommessaService } from "src/spesecommessa/spesecommessa.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Commessa]),
    TypeOrmModule.forFeature([Utente]),
    TypeOrmModule.forFeature([Attivitacommessa]),
    TypeOrmModule.forFeature([Spesecommessa]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [CommessaController],
  providers: [
    CommessaService,
    UtenteService,
    AttivitacommessaService,
    SpesecommessaService,
  ],
})
export class CommessaModule {}
