import { StreamableFile } from "@nestjs/common";
import { CommessaService } from "src/commessa/commessa.service";
import { UtenteService } from "src/utente/utente.service";
import { PreventivoService } from "src/preventivo/preventivo.service";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
export declare class ReportController {
  private readonly commessaService;
  private readonly utenteService;
  private readonly attivitaPreventivoService;
  private readonly attivitaCommessaService;
  private readonly preventivoService;
  constructor(
    commessaService: CommessaService,
    utenteService: UtenteService,
    attivitaPreventivoService: AttivitaprevService,
    attivitaCommessaService: AttivitacommessaService,
    preventivoService: PreventivoService
  );
  findAll(datafine: Date, datainizio: Date): Promise<any[]>;
  getFile(): StreamableFile;
  getFileUtente(): StreamableFile;
  getFileGlobale(): StreamableFile;
  persede(datafine: Date, datainizio: Date): Promise<any[]>;
  reporbale(
    datafine: Date,
    datainizio: Date
  ): Promise<{
    TotalePreventivi: number;
    TotalePreventiviVenduti: number;
    DifferenzaEffettuatiVenduti: number;
    DifferenzaEffettuatiVendutiPercentuale: number;
    TotalePreventivato: number;
    TotaleVenduto: number;
    DifferenzaPreventivatoVenduto: number;
    DifferenzaPreventivatoVendutoPercentuale: number;
    AttivitaPreviste: number;
    AttivitaConsutivo: number;
    DifferenzaAttivitaPrev: number;
    DifferenzaAttivitaPercentuale: number;
  }>;
}
