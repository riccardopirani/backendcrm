import { Module } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ReportController } from "./report.controller";
import { PreventivoService } from "src/preventivo/preventivo.service";
import { Commessa } from "src/commessa/entities/commessa.entity";
import { CommessaService } from "src/commessa/commessa.service";
import { Attivitacommessa } from "src/attivitacommessa/entities/attivitacommessa.entity";
import { Utente } from "src/utente/entities/utente.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { Spesecommessa } from "src/spesecommessa/entities/spesecommessa.entity";
import { Preventivo } from "src/preventivo/entities/preventivo.entity";
import { UtenteService } from "src/utente/utente.service";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
import { SpesecommessaService } from "src/spesecommessa/spesecommessa.service";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";
import { Attivitaprev } from "src/attivitaprev/entities/attivitaprev.entity";
import { SpesepreventivoService } from "src/spesepreventivo/spesepreventivo.service";
import { Spesepreventivo } from "src/spesepreventivo/entities/spesepreventivo.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Commessa]),
    TypeOrmModule.forFeature([Utente]),
    TypeOrmModule.forFeature([Attivitacommessa]),
    TypeOrmModule.forFeature([Attivitaprev]),
    TypeOrmModule.forFeature([Spesecommessa]),
    TypeOrmModule.forFeature([Spesepreventivo]),
    TypeOrmModule.forFeature([Preventivo]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [ReportController],
  providers: [
    ReportService,
    PreventivoService,
    CommessaService,
    UtenteService,
    SpesecommessaService,
    SpesepreventivoService,
    AttivitacommessaService,
    SpesecommessaService,
    AttivitaprevService,
  ],
})
export class ReportModule {}
