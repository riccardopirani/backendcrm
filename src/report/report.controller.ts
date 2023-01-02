import { Controller, Get, Query, StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommessaService } from "src/commessa/commessa.service";
import { UtenteService } from "src/utente/utente.service";
import { PreventivoService } from "src/preventivo/preventivo.service";
import { AttivitaprevService } from "src/attivitaprev/attivitaprev.service";
import { AttivitacommessaService } from "src/attivitacommessa/attivitacommessa.service";
import { Location } from "src/preventivo/entities/preventivo.entity";
import { ExportToCsv } from "export-to-csv";
import { UserRole } from "src/utente/entities/utente.entity";
import { ApiBearerAuthWithTag } from "../utils/swagger/swagger.decorator";
import { createReadStream } from "fs";
import { join } from "path";
const fs = require("fs");

@ApiTags("report")
@Controller("report")
export class ReportController {
  constructor(
    private readonly commessaService: CommessaService,
    private readonly utenteService: UtenteService,
    private readonly attivitaPreventivoService: AttivitaprevService,
    private readonly attivitaCommessaService: AttivitacommessaService,
    private readonly preventivoService: PreventivoService
  ) {}

  @ApiBearerAuthWithTag()
  @Get("/utente")
  async findAll(
    @Query("datafine") datafine: Date,
    @Query("datainizio") datainizio: Date
  ) {
    let listaUtenti = await this.utenteService.findAll();
    let returnvalue = [];
    let returnvaluejson = [];
    let obejctfirst = {
      idUtente: "IdUtente",
      Nome: "Nome",
      Cognome: "Cognome",
      Ruolo: "Ruolo",
      PreventiviUtente: "PreventiviUtente",
      PreventiviVenduti: "PreventiviVenduti",
      DifferenzaPreventivi: "DifferenzaPreventivi",
      DifferenzaPreventiviPercentuale: "DifferenzaPreventiviPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPrevista: "AttivitaPrevista",
      AttivitaEseguite: "AttivitaEseguite",
      DifferenzaAttivitaEseguitePreviste: "DifferenzaAttivitaEseguitePreviste",
      DifferenzaAttivitaEseguitePercentuale:
        "DifferenzaAttivitaEseguitePercentuale",
    };
    returnvalue.push(obejctfirst);
    for (let i = 0; i < listaUtenti.length; i++) {
      if (
        listaUtenti[i].ruolo === UserRole.COMMERCIAL ||
        listaUtenti[i].ruolo === UserRole.QUOTATOR
      ) {
        let idUtente = listaUtenti[i].id;
        let nome = listaUtenti[i].nome;
        let cognome = listaUtenti[i].cognome;
        let ruolo = listaUtenti[i].ruolo;
        let contapreventiviutente = await this.preventivoService.contaperutente(
          idUtente,
          false,
          datainizio,
          datafine
        );
        let totalevenduto = await this.preventivoService.totalevendutoutente(
          idUtente,
          datainizio,
          datafine
        );
        let totaleeuropreventivi =
          await this.preventivoService.totalepreventiviutente(
            idUtente,
            datainizio,
            datafine
          );
        let contapreventiviutentevenduti =
          await this.preventivoService.contaperutente(
            idUtente,
            true,
            datainizio,
            datafine
          );
        let diffprevvenduti =
          contapreventiviutente - contapreventiviutentevenduti;
        let differenzapercentuale =
          ((contapreventiviutente - contapreventiviutentevenduti) /
            contapreventiviutente) *
          100;

        let differenzapercentuale2 =
          ((totaleeuropreventivi - totalevenduto) / totaleeuropreventivi) * 100;
        if (
          differenzapercentuale === 0 ||
          differenzapercentuale === null ||
          !differenzapercentuale
        ) {
          differenzapercentuale = 0;
        }

        if (
          differenzapercentuale2 === 0 ||
          differenzapercentuale2 === null ||
          !differenzapercentuale2
        ) {
          differenzapercentuale2 = 0;
        }

        let preventiviindata =
          await this.preventivoService.contapreventiviperdataperutente(
            idUtente,
            datainizio,
            datafine
          );
        let attivitaprev = 0,
          attivitaeseguite = 0;

        if (preventiviindata.length > 0) {
          for (let i = 0; i < preventiviindata.length; i++) {
            attivitaprev =
              attivitaprev +
              (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
                preventiviindata[i].id
              ));
            let commesseassociateapreventivo =
              await this.commessaService.loadbyIdPreventivo(
                preventiviindata[i].id
              );

            for (let i2 = 0; i2 < commesseassociateapreventivo.length; i2++) {
              attivitaeseguite =
                attivitaeseguite +
                (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
                  commesseassociateapreventivo[i2].id
                ));
            }
          }
        } else {
          console.log("Nessun preventivo in data");
        }

        let differenzapercentualeattivitaprev =
          ((attivitaprev - attivitaeseguite) / attivitaprev) * 100;

        let obejct = {
          idUtente: idUtente,
          Nome: nome,
          Cognome: cognome,
          Ruolo: ruolo,
          PreventiviUtente: contapreventiviutente,
          PreventiviVenduti: contapreventiviutentevenduti,
          DifferenzaPreventivi: diffprevvenduti,
          DifferenzaPreventiviPercentuale: differenzapercentuale,
          TotalePreventivato: totaleeuropreventivi,
          TotaleVenduto: totalevenduto,
          DifferenzaPreventivatoVenduto: totaleeuropreventivi - totalevenduto,
          DifferenzaPreventivatoVendutoPercentuale: differenzapercentuale2,
          AttivitaPrevista: attivitaprev,
          AttivitaEseguite: attivitaeseguite,
          DifferenzaAttivitaEseguitePreviste: attivitaprev - attivitaeseguite,
          DifferenzaAttivitaEseguitePercentuale:
            differenzapercentualeattivitaprev,
        };
        returnvaluejson.push(obejct);
        returnvalue.push(obejct);
      }
    }
    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report Preventivi e Commesse",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("reportprevecommesse.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }
    return returnvaluejson;
  }

  @ApiBearerAuthWithTag()
  @Get("/sede/csv")
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "dataprevsede.csv"));
    return new StreamableFile(file);
  }

  @ApiBearerAuthWithTag()
  @Get("/utente/csv")
  getFileUtente(): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), "reportprevecommesse.csv")
    );
    return new StreamableFile(file);
  }

  @ApiBearerAuthWithTag()
  @Get("/globale/csv")
  getFileGlobale(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "dataprevglobale.csv"));
    return new StreamableFile(file);
  }

  @ApiBearerAuthWithTag()
  @Get("/sede")
  async persede(
    @Query("datafine") datafine: Date,
    @Query("datainizio") datainizio: Date
  ) {
    let returnvalue = [];
    let returnvaluejson = [];
    let obejctfirst = {
      Location: "Location",
      TotalePreventivi: "TotalePreventivi",
      TotalePreventiviVenduti: "TotalePreventiviVenduti",
      DifferenzaEffettuatiVenduti: "DifferenzaEffettuatiVenduti",
      DifferenzaEffettuatiVendutiPercentuale:
        "DifferenzaEffettuatiVendutiPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPreviste: "AttivitaPreviste",
      AttivitaConsutivo: "AttivitaConsutivo",
      DifferenzaAttivitaPrev: "DifferenzaAttivitaPrev",
      DifferenzaAttivitaPercentuale: "DifferenzaAttivitaPercentuale",
    };
    returnvalue.push(obejctfirst);
    for (let key in Location) {
      let locale: string = Location[key];
      let preventivi = await this.preventivoService.contapreventivisede(
        locale,
        datainizio,
        datafine
      );
      let preventivivenduti =
        await this.preventivoService.contapreventivisedevenduti(
          locale,
          datainizio,
          datafine
        );

      let preventivivendutiglobale =
        await this.preventivoService.contapreventivisedevendutiinfo(
          locale,
          datainizio,
          datafine
        );
      let differenzapercentulaprev = 0;

      let totalepreventivato = await this.preventivoService.sommaprezzitotali(
        locale,
        datainizio,
        datafine
      );
      let sommatotalevenduto = await this.preventivoService.sommatotalevenduto(
        locale,
        datainizio,
        datafine
      );
      let differenzapreventivatovenduto = 0;
      let attivitaprev = 0;
      let attivitaconsu = 0;
      let diffattivitaperc = 0;

      if (preventivi > 0) {
        differenzapercentulaprev =
          ((preventivi - preventivivenduti) / preventivi) * 100;
        differenzapreventivatovenduto =
          ((totalepreventivato - sommatotalevenduto) / totalepreventivato) *
          100;

        try {
          for (let i = 0; i < preventivivendutiglobale.length; i++) {
            attivitaprev =
              attivitaprev +
              (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
                preventivivendutiglobale[i].id
              ));

            let commesseassociateapreventivo =
              await this.commessaService.loadbyIdPreventivo(
                preventivivendutiglobale[i].id
              );
            attivitaconsu =
              attivitaconsu +
              (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
                commesseassociateapreventivo[0].id
              ));

            diffattivitaperc =
              ((attivitaprev - attivitaconsu) / attivitaprev) * 100;
          }
        } catch (err) {
          console.log("Errore: " + err);
        }
      }

      let obejct = {
        Location: locale,
        TotalePreventivi: preventivi,
        TotalePreventiviVenduti: preventivivenduti,
        DifferenzaEffettuatiVenduti: preventivi - preventivivenduti,
        DifferenzaEffettuatiVendutiPercentuale: differenzapercentulaprev,
        TotalePreventivato: totalepreventivato,
        TotaleVenduto: sommatotalevenduto,
        DifferenzaPreventivatoVenduto: totalepreventivato - sommatotalevenduto,
        DifferenzaPreventivatoVendutoPercentuale: differenzapreventivatovenduto,
        AttivitaPreviste: attivitaprev,
        AttivitaConsutivo: attivitaconsu,
        DifferenzaAttivitaPrev: attivitaprev - attivitaconsu,
        DifferenzaAttivitaPercentuale: diffattivitaperc,
      };
      returnvaluejson.push(obejct);
      returnvalue.push(obejct);
    }

    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report per Sede",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("dataprevsede.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }

    return returnvaluejson;
  }

  @ApiBearerAuthWithTag()
  @Get("/globale")
  async reporbale(
    @Query("datafine") datafine: Date,
    @Query("datainizio") datainizio: Date
  ) {
    var returnvalue = [];
    let obejctfirst = {
      TotalePreventivi: "TotalePreventivi",
      TotalePreventiviVenduti: "TotalePreventiviVenduti",
      DifferenzaEffettuatiVenduti: "DifferenzaEffettuatiVenduti",
      DifferenzaEffettuatiVendutiPercentuale:
        "DifferenzaEffettuatiVendutiPercentuale",
      TotalePreventivato: "TotalePreventivato",
      TotaleVenduto: "TotaleVenduto",
      DifferenzaPreventivatoVenduto: "DifferenzaPreventivatoVenduto",
      DifferenzaPreventivatoVendutoPercentuale:
        "DifferenzaPreventivatoVendutoPercentuale",
      AttivitaPreviste: "AttivitaPreviste",
      AttivitaConsutivo: "AttivitaConsutivo",
      DifferenzaAttivitaPrev: "DifferenzaAttivitaPrev",
      DifferenzaAttivitaPercentuale: "DifferenzaAttivitaPercentuale",
    };
    returnvalue.push(obejctfirst);
    let preventivi = await this.preventivoService.contapreventivirage(
      datainizio,
      datafine
    );
    let preventivivenduti =
      await this.preventivoService.contapreventivisedevendutiglobale(
        datainizio,
        datafine
      );
    let differenzapercentulaprev = 0;

    let totalepreventivato =
      await this.preventivoService.sommaprezzitotaliglobale(
        datainizio,
        datafine
      );
    let sommatotalevenduto =
      await this.preventivoService.sommatotalevendutoglobale(
        datainizio,
        datafine
      );
    let differenzapreventivatovenduto = 0;
    let attivitaprev = 0;
    let attivitaconsu = 0;
    let diffattivitaperc = 0;
    if (preventivi > 0) {
      differenzapercentulaprev =
        ((preventivi - preventivivenduti) / preventivi) * 100;
      differenzapreventivatovenduto =
        ((totalepreventivato - sommatotalevenduto) / totalepreventivato) * 100;

      let preventiviindata =
        await this.preventivoService.contapreventiviperdataperutenteprev(
          datainizio,
          datafine
        );

      for (let i = 0; i < preventiviindata.length; i++) {
        attivitaprev =
          attivitaprev +
          (await this.attivitaPreventivoService.getTotaleAttivitaPreviste(
            preventiviindata[i].id
          ));

        let commesseassociateapreventivo =
          await this.commessaService.loadbyIdPreventivo(preventiviindata[i].id);
        attivitaconsu =
          attivitaconsu +
          (await this.attivitaCommessaService.getTotaleAttivitaPreviste(
            commesseassociateapreventivo[0].id
          ));

        diffattivitaperc =
          ((attivitaprev - attivitaconsu) / attivitaprev) * 100;
      }
    }
    let obejct2 = {
      TotalePreventivi: preventivi,
      TotalePreventiviVenduti: preventivivenduti,
      DifferenzaEffettuatiVenduti: preventivi - preventivivenduti,
      DifferenzaEffettuatiVendutiPercentuale: differenzapercentulaprev,
      TotalePreventivato: totalepreventivato,
      TotaleVenduto: sommatotalevenduto,
      DifferenzaPreventivatoVenduto: totalepreventivato - sommatotalevenduto,
      DifferenzaPreventivatoVendutoPercentuale: differenzapreventivatovenduto,
      AttivitaPreviste: attivitaprev,
      AttivitaConsutivo: attivitaconsu,
      DifferenzaAttivitaPrev: attivitaprev - attivitaconsu,
      DifferenzaAttivitaPercentuale: diffattivitaperc,
    };
    returnvalue.push(obejct2);
    var list = [];
    list.push(obejct2);
    try {
      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: "Report globale",
        useTextFile: false,
        useBom: true,
      };
      const csvExporter = new ExportToCsv(options);
      const report = csvExporter.generateCsv(JSON.stringify(returnvalue), true);
      fs.writeFileSync("dataprevglobale.csv", report);
    } catch (err) {
      console.log("Errore generazione csv: " + err);
    }

    return obejct2;
  }
}
